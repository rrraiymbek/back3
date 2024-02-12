const express = require("express");
const router = express.Router();
const User = require("../model/userType");
router.get("/register", (req, res) => {
  res.render("registration");
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).send("Username already taken");
    }

    const newUser = new User({
      username,
      password: password,
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    });
    await newUser.save();

    console.log("User registered successfully:", newUser);
    res.redirect("/login");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Error registering user. Please try again.");
  }
});

module.exports = router;
