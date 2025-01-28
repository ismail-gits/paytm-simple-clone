const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://admin:smile476245@cluster0.el80i.mongodb.net/users")
.then(() => console.log("Connected to mongodb successfully! "))
.catch((err) => console.log("Error connecting to mongodb!" + err))

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  }
})

const accountSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  balance: {
    type: Number,
    required: String
  }
})

const USER = mongoose.model('users', userSchema)
const ACCOUNT = mongoose.model('accounts', accountSchema)

module.exports = {
  USER,
  ACCOUNT
}