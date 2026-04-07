const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    items: Array,
    total: Number,
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);