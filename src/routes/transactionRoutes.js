const express = require("express");

const router = express.Router();

const Transaction = require("../models/Transaction");


// GET ALL TRANSACTIONS

router.get("/", async (req, res) => {

  try {

    const transactions =
      await Transaction.find().sort({
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

    const {
      userId,
      amount,
      location
    } = req.body;

    console.log("REQ BODY:", req.body);

    let isFraud = false;

const amountValue = Number(amount);

const locationValue =
  location.toLowerCase().trim();

console.log(amountValue);
console.log(locationValue);

// RULE 1

if (amountValue >= 10000) {

  isFraud = true;

}

// RULE 2

const riskyLocations = [
  "russia",
  "dark web",
  "unknown"
];

if (
  riskyLocations.includes(locationValue)
) {

  isFraud = true;

}

console.log("FINAL:", isFraud);

    console.log("FINAL RESULT:", isFraud);

    const newTransaction =
      new Transaction({

        userId: userId || "Anonymous",

        amount: Number(amount),

        location,

        isFraud

      });

    await newTransaction.save();

    res.status(201).json({

      success: true,

      transaction: newTransaction

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

});

module.exports = router;