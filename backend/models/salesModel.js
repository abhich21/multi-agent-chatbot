const mongoose = require("mongoose");

const SalesSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
  },
  week: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Sales", SalesSchema);
