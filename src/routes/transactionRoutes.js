const express = require("express");

const router = express.Router();

const Transaction = require("../models/Transaction");


// GET ALL TRANSACTIONS

router.get("/", async (req, res) => {

  try {

    const transactions = await Transaction.find();

    res.json({
      success: true,
      transactions
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});


// ADD TRANSACTION

router.post("/", async (req, res) => {

  try {

    const { user, amount, location, status } = req.body;

    const newTransaction = new Transaction({
      user,
      amount,
      location,
      status
    });

    await newTransaction.save();

    res.status(201).json({
      success: true,
      transaction: newTransaction
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

module.exports = router;