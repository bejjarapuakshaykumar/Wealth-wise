import mongoose from "mongoose";

const investmentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  returns: {
    type: Number,
    required: true,
  },
  riskLevel: {
    type: String,
    default: "Medium",
  },
});

const Investment = mongoose.model("Investment", investmentSchema);

// 🔥 This line is what fixes your error
export default Investment;
