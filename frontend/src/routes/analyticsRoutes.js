const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {

  try {

    const analyticsData = {
      fraudDetected: 128,
      accuracy: "98%",
      riskLevel: "Low",
      weeklyFrauds: [12, 18, 10, 28, 19, 35, 25],
      safeTransactions: 82,
      fraudTransactions: 18
    };

    res.json(analyticsData);

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }

});

module.exports = router;