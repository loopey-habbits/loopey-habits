const { Schema, model, Types } = require("mongoose");

const habitSchema = new Schema(
  {
    title: String,
    category: String,
    owner: {
      type: Types.ObjectId,
      ref: "User",
    },
    goals: String,
  },
  {
    timestamps: true,
  }
);

const Habit = model("Habit", habitSchema);
module.exports = Habit;
