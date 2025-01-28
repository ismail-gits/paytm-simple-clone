const express = require('express')
const router = express.Router()
const { signupBodySchema, signinBodySchema, updateUserInfoSchema } = require('../validations')
const { USER } = require('../db')
const { ACCOUNT } = require('../db')
const { JWT_SECRET } = require('../config')
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { authMiddleware } = require("../middlewares")

router.use(express.json())

router.post('/signup', async (req, res) => {
  const inputValidation = signupBodySchema.safeParse(req.body)

  if (!inputValidation.success) {
    console.log(inputValidation.error.errors)
    return res.status(400).json({message: "Incorrect inputs"})
  }

  const { username, firstName, lastName, password } = req.body

  const existingUser = await USER.findOne({username})

  if (existingUser) {
    return res.status(400).json({message: "email already taken"})
  }

  // hashing the password before storing into the database using bcrypt
  // we hash the password with a salt in bcrypt
  // higher the salt is more secure but slower
  // no key needed as this is hashing not encryption
  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  const user = await USER.create({
    username, 
    firstName,
    lastName,
    password: hashedPassword
  })

  const userId = user._id
  const token = JWT.sign({userId}, JWT_SECRET)

  // creating an account for the user and adding some demo balance for now
  await ACCOUNT.create({
    userId,
    balance: Math.random() * 10000
  })

  return res.json({
    message: "User created successfully",
    userId,
    token
  })
})

router.post('/signin', async (req, res) => {
  const inputValidation = signinBodySchema.safeParse(req.body)
  
  if(!inputValidation.success) {
    console.log(inputValidation.error.errors)
    return res.status(400).json({message: "invalid username or password"})
  }

  const { username, password } = req.body

  const user = await USER.findOne({username})
  if (!user) {
    return res.status(400).json({message: "username doesn't exists"})
  }

  // Comparing the provided password with the hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return res.status(400).json({message: "invalid password"})
  }

  // dont forget converting it to string as it will return an object type something
  const userId = user._id.toString()
  const token = JWT.sign({userId}, JWT_SECRET)

  return res.json({token})
})

router.get('/', authMiddleware, async(req, res) => {
  return res.json({message: "Auth Completed"})
})

// Update either password, firstName, lastName or everything
router.put('/', authMiddleware, async (req, res) => {
  const { success } = updateUserInfoSchema.safeParse(updateUserInfoSchema)

  if (!success) {
    return res.status(400).json({message: "Invalid inputs"})
  }

  if (req.body.password) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10) // 10 is salt/rounds
    req.body.password = hashedPassword
  }

  // returns old user info
  // const updatedUser = await USER.findByIdAndUpdate(userId, updateFields)

  // returns new user info
  const updatedUser = await USER.findByIdAndUpdate(req.userId, req.body, {new: true}) // {new: true} returns the updated document
  
  if (!updatedUser) {
    return res.status(400).json({message: "user not found, invalid userid"})
  }

  return res.json({message: "Updated successully!"})
})


// route to get users from backend, filterable via firstName/lastName
router.get('/bulk', authMiddleware, async (req, res) => {
  // if there is no filter then everything should be displayed and hence "" else error
  const filter = req.query.filter || ""

  const users = await USER.find({
    $or: [
      {firstName: {$regex: filter}},
      {lastName: {$regex: filter}}
    ]
  }).select("-__v -password")

  return res.json({users})
  
})

module.exports = router