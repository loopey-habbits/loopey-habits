const { Schema, model, Types } = require("mongoose");

const habitSchema = new Schema(
  {
    title: String,
    category: String,
    goals: String,
    owner: {
      type: Types.ObjectId,
      ref: "User",
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("Habit", habitSchema);
 
