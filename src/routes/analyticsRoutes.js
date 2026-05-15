const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {

  res.json({
    fraudDetected: 128,
    accuracy: "98%",
    riskLevel: "Low"
  });

});

module.exports = router;