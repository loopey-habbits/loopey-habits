const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");

const Habit = require("../models/Habit.model");
const User = require("../models/User.model");

const router = express.Router();

// GET /habits
router.get("/user-profile", isLoggedIn, (req, res, next) => {
  Habit.find()
    .then((habitsFromDB) => {
      const data = {
        habits: habitsFromDB,
      };
      res.render("auth/user-profile", {
        data,
       // currentUser: req.session.currentUser,
      });
    })
    .catch((err) => {
      console.log("error getting list of habits from DB", err);
      next(err);
    });
});

// CREATE: habit
router.get("/habits/create", isLoggedIn, (req, res, next) => {
  res.render("habits/habit-create");
});

// CREATE: process form
router.post("/habits/create", isLoggedIn, (req, res, next) => {
  const newHabit = {
    title: req.body.title,
    category: req.body.category,
    goals: req.body.goals,
    owner: req.session.currentUser._id, //we get owner from current session
  };

  Habit.create(newHabit)
    .then((newHabit) => {
      res.redirect("/user-profile");
    })
    .catch((e) => {
      console.log("error creating new habit", e);
      next(e);
    });
});

module.exports = router;
