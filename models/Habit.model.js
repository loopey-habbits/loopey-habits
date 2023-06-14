const { Schema, model, Types } = require("mongoose");

const habitSchema = new Schema(
  {
    title: String,
    category: String,
    goals: String,
    counter: Number,
    owner: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Habit", habitSchema);

// Habit.findById(id)
// .then((foundHabit) => { Habit.findByIdAndUpdate(id, {counter: foundHabit.counter + 1}, {new: true} }
