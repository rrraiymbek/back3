const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const user = req.session.user;
  console.log(user);
  res.render("mainPage", { user });
});

router.post("/logout", (req, res) => {
  console.log("Received logout request");
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).send("Error during logout");
    } else {
      res.redirect("/login");
    }
  });
});
module.exports = router;
