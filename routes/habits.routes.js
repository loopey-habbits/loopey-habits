const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");

const Habit = require("../models/Habit.model");
const User = require("../models/User.model");

const router = express.Router();

// GET /habits
router.get("/user-profile", isLoggedIn, (req, res, next) => {
  userId = req.session.currentUser._id;

  Habit.find({ owner: userId })
    .then((userHabitsFromDB) => {
      const data = {
        habits: userHabitsFromDB,
      };
      res.render("users/user-profile", {
        data,
        currentUser: req.session.currentUser
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
    counter: 0,
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

//GET user-profile and update counter
router.get("/user-profile", isLoggedIn, (req, res, next) => {
  Habit.find()
    .then((habitsFromDB) => {
      const data = {
          habits: habitsFromDB,
          }
      .then((foundHabit) => {
        Habit.findByIdAndUpdate(
          habitId,
          { counter: foundHabit.counter + 1 },
          { new: true }
        );
        res.render("users/user-profile", { data });
      });
    })
    .catch((err) => {
      console.log("error getting list of habits from DB", err);
      next(err);
    });
});

// GET /user-profile/:habitId/edit
router.get("/user-profile/:habitId/edit", isLoggedIn, (req, res, next) => {
  const { habitId } = req.params;

  Habit.findById(habitId)
    .then((habit) => {
      res.render("habits/habit-edit", { habit });
    })
    .catch((err) => {
      console.log("error retrieving habit from DB", err);
      next(err);
    });
});

// POST /user-profile/:habitId/edit
router.post("/user-profile/:habitId/edit", isLoggedIn, (req, res, next) => {
  const { habitId } = req.params;
  const { title, category, goals } = req.body;
  console.log("=====", { habitId });

  Habit.findByIdAndUpdate(habitId, { title, category, goals }, { new: true })
    .then((updatedHabit) => {
      console.log(updatedHabit);
      res.redirect(`/user-profile`);
    })
    .catch((err) => {
      console.log("error updating habit", err);
      next(err);
    });
});

// POST /habits/:habitId/delete
router.post("/user-profile/:habitId/delete", isLoggedIn, (req, res, next) => {
  const { habitId } = req.params;

  Habit.findByIdAndDelete(habitId)
    .then(() => {
      res.redirect("/user-profile");
    })
    .catch((err) => {
      console.log("error deleting habit", err);
      next(err);
    });
});

router.post(
  "/user-profile/:habitId/tracker-update",
  isLoggedIn,
  (req, res, next) => {
    console.log(req.body, "body");
    console.log(req.params, "params");
    const { habitId } = req.params;
    const { counter } = req.body;
    Habit.findByIdAndUpdate(habitId, { counter }, { new: true })
      .then((updatedHabit) => {
        console.log(updatedHabit);
        res.redirect("/user-profile");
      })
      .catch((err) => {
        console.log("error updating habit", err);
        next(err);
      });
  }
);

module.exports = router;
