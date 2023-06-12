const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const Habit = require("../models/Habit.model");
const User = require("../models/User.model");
const router = express.Router();

router.get("/habits/create", isLoggedIn, (req, res, next) => {
  res.render("habits/habit-create");
});

// CREATE: process form
router.post("/habits/create", isLoggedIn, (req, res, next) => {
  const newHabit = {
    title: req.body.title,
    category: req.body.category,
    owner: req.body.owner,
    goals: req.body.goals,
  };

  Habit.create(newHabit)
    .then((newHabit) => {
      res.send("habit created");
      // res.redirect("/habits");
    })
    .catch((e) => {
      console.log("error creating new habit", e);
      next(e);
    });
});

module.exports = router;
