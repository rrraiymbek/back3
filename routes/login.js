const express = require("express");
const router = express.Router();

const User = require("../model/userType");
router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      console.log("User not found");
      return res.status(401).send("Invalid username or password");
    }
    if (password === user.password) {
      req.session.user = { id: user._id, username: user.username, isAdmin: user.isAdmin };

      
      if (user.isAdmin) {
        console.log("Admin login successful");
        res.redirect("/admin");
      } else {
        console.log("User login successful");
        res.redirect("/user");
      }
    } else {
      console.log("Invalid password");
      res.status(401).send("Invalid username or password");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Error during login. Please try again.");
  }
});

module.exports = router;
