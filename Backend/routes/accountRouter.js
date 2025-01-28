const express = require('express')
const router = express.Router()
const { authMiddleware } = require('../middlewares')
const { ACCOUNT }  = require('../db') 
const mongoose = require('mongoose')

router.use(express.json())

// Route to get balance of a user
router.get('/balance', authMiddleware, async (req, res) => {
  const account = await ACCOUNT.findOne({userId: req.userId})

  return res.json({balance: account.balance})
})

// Route / endpoint for user to transfer money to another account

// Good Solution
// Using transactions
router.post('/transfer', authMiddleware, async (req, res) => {
  try {
    const session = await mongoose.startSession()

    session.startTransaction()

    const { to, amount } = req.body

    const fromAccount = await ACCOUNT.findOne({userId: req.userId})
    const toAccount = await ACCOUNT.findOne({userId: to})

    if (!toAccount) {
      await session.abortTransaction()
      return res.status(400).json({message: "Invalid account"})
    }

    if (fromAccount.balance < amount) {
      await session.abortTransaction()
      return res.status(400).json({message: "Insufficient balance"})
    }

    // perform the transfer
    await ACCOUNT.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount }}
    ).session(session)

    await ACCOUNT.updateOne(
      { userId: to },
      { $inc: { balance: amount }}
    ).session(session)

    // commit the transaction
    await session.commitTransaction()

    const updatedFromAccount = await ACCOUNT.findOne({userId: req.userId})

    res.json({
      message: "Transfer successful",
      balance: updatedFromAccount.balance
    })
  }
  catch(err) {
    console.log(err)
    return res.status(500).json({message: "Intenal Server Error"})
  }
})

// Bad solution
// But lets say amount was update in toAccount and somehow got cancelled in fromAccount
// or viceversa => in these scenarios the updation needs to revert
// hence need to use something called as TRANSACTIONS in mongodb
// router.post('/transfer', authMiddleware, async (req, res) => {
//   const fromAccount = await ACCOUNT.findOne({userId: req.userId})

//   const { to, amount } = req.body

//   const toAccount = await ACCOUNT.findOne({userId: to})

//   if (!toAccount) {
//     return res.status(400).json({message: "Invalid account"})
//   }

//   if (fromAccount.balance < amount) {
//     return res.status(400).json({message: "Insufficient balance"})
//   }

//   await ACCOUNT.updateOne(
//     { userId: req.userId },
//     { $inc: { balance: -amount }}
//   )

//   await ACCOUNT.updateOne(
//     { userId: to },
//     { $inc: { balance: amount }}
//   )

//   return res.json({message: "Transfer successful"})
// })

module.exports = router