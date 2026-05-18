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

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Transaction", transactionSchema);