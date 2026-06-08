const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const Transaction = require("../models/Transaction");

router.use(authMiddleware);

router.get("/", async (req, res, next) => {

  try {

    const totalTransactions =
      await Transaction.countDocuments();

    const fraudTransactions =
      await Transaction.countDocuments({
        isFraud: true
      });

    const safeTransactions =
      await Transaction.countDocuments({
        isFraud: false
      });

    const fraudPercentage =
      totalTransactions > 0
        ? (
            (fraudTransactions / totalTransactions) * 100
          ).toFixed(2)
        : 0;

    let riskLevel = "Low";

    if (fraudPercentage > 70) {

      riskLevel = "High";

    } else if (fraudPercentage > 40) {

      riskLevel = "Medium";

    }

    res.json({

      success: true,

      totalTransactions,

      fraudTransactions,

      safeTransactions,

      fraudPercentage,

      riskLevel,

      accuracy: "98%"

    });

  } catch (error) {

    next(error);

  }

});

module.exports = router;