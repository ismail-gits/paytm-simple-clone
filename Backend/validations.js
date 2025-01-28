const zod = require('zod')

const signupBodySchema = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string().min(6)
})

const signinBodySchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
})

const updateUserInfoSchema = zod.object({
  // optional() meaning they can pass or not depends on the user
  password: zod.string().min(6).optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
})



module.exports = {
  signupBodySchema,
  signinBodySchema,
  updateUserInfoSchema
}