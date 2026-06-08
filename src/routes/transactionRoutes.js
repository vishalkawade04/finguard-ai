const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const validateTransaction = require("../middleware/validateTransaction");
const Transaction = require("../models/Transaction");

const calculateRisk = require("../services/fraudEngine");


router.use(authMiddleware);

// GET ALL TRANSACTIONS

router.get("/", async (req, res, next) => {

  try {

    const transactions =
      await Transaction.find().sort({
        createdAt: -1
      });

    const enrichedTransactions =
      transactions.map((transaction) => ({
        ...transaction.toObject(),
        recommendedAction:
          calculateRisk.getRecommendedAction(transaction.riskLevel || "Low")
      }));

    res.json({

      success: true,

      transactions: enrichedTransactions

    });

  } catch (error) {

    next(error);

  }

});


// ADD TRANSACTION

router.post("/", validateTransaction, async (req, res, next) => {

  try {

    const {
      userId,
      amount,
      location
    } = req.body;

    const amountValue = Number(amount);
    const normalizedUserId = userId || "Anonymous";
    const normalizedLocation = String(location || "").trim();
    const createdAt = new Date();
    const tenMinutesAgo = new Date(createdAt.getTime() - 10 * 60 * 1000);
    const twentyFourHoursAgo = new Date(createdAt.getTime() - 24 * 60 * 60 * 1000);

    const recentUserTransactions =
      await Transaction.find({
        userId: normalizedUserId,
        createdAt: { $gte: tenMinutesAgo }
      }).sort({ createdAt: -1 });

    const duplicateTransactions =
      await Transaction.find({
        userId: normalizedUserId,
        amount: amountValue,
        location: normalizedLocation,
        createdAt: { $gte: twentyFourHoursAgo }
      }).sort({ createdAt: -1 });

    const risk =
      calculateRisk(
        {

        amount: amountValue,

        location: normalizedLocation,

        createdAt

      },
      {
        recentUserTransactions,
        duplicateTransactions
      });

    const isFraud =
      risk.riskLevel === "High";

    const newTransaction =
      new Transaction({

        userId: normalizedUserId,

        amount: amountValue,

        location: normalizedLocation,

        isFraud,

        riskScore: risk.riskScore,

        riskLevel: risk.riskLevel,

        riskReason: risk.riskReason,

        explanation: risk.explanation

      });

    await newTransaction.save();

    res.status(201).json({

      success: true,

      recommendedAction: risk.recommendedAction,

      transaction: {
        ...newTransaction.toObject(),
        recommendedAction: risk.recommendedAction
      }

    });

  } catch (error) {

    next(error);

  }

});

module.exports = router;
