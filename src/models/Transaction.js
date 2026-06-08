const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({

  userId: {
    type: String,
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  isFraud: {
    type: Boolean,
    default: false
  },

  riskScore: {
    type: Number,
    default: 0
  },

  riskLevel: {
    type: String,
    default: "Low"
  },

  riskReason: {
    type: [String],
    default: []
  },

  explanation: {
    type: String,
    default: "This transaction is low risk because no fraud risk rules were triggered."
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Transaction", transactionSchema);
