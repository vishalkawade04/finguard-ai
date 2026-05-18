
const express = require("express");

const router = express.Router();

const Transaction = require("../models/Transaction");

// GET ALL TRANSACTIONS

router.get("/", async (req, res) => {

  try {

    const transactions = await Transaction.find().sort({
      createdAt: -1
    });

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

    console.log(req.body);

    const {
      userId,
      amount,
      location,
      isFraud
    } = req.body;

    const newTransaction = new Transaction({
      userId: userId || "Anonymous",
      amount,
      location,
      isFraud
    });

    await newTransaction.save();

    res.status(201).json(newTransaction);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});



module.exports = router;

