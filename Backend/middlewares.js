const { JWT_SECRET } = require('./config')
const jwt = require('jsonwebtoken')

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({message: "invalid authorization token"})
  }

  const token = authHeader.split(" ")[1]

  try {
    const verified = jwt.verify(token, JWT_SECRET)
    
    // making sure that its the userId that is being passed in as argument while signing with the secret
    if (verified.userId) {
      req.userId = verified.userId
      next()
    }
    else {
      return res.status(400).json({message: "invalid authorization token"})
    }
  }
  catch(err) {
    return res.status(400).json({message: "invalid authorization token"})
  }
}

module.exports = {
  authMiddleware
}