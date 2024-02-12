const express = require("express");
const router = express.Router();
const axios = require("axios");
const History = require("../model/historyType");

router.get("/mockapi", async (req, res) => {
  let data;
  let error = null;

  try {
    const options = {
      method: "GET",
      url: "https://65be23f5dcfcce42a6f1e84f.mockapi.io/users",
    };

    const response = await axios.request(options);
    data = response.data;
    console.log(data);

    const historyEntry = new History({
      user_id: req.session.user.id,
      request_type: "Mock API Data",
      request_data: JSON.stringify(data),
      outcome: "Success",
    });
    await historyEntry.save();
  } catch (err) {
    console.error(err);
    data = null;
    error = "Error fetching data, please try again";

    const historyEntry = new History({
      user_id: req.session.user.id,
      request_type: "Mock API Data",
      request_data: null,
      outcome: "Error",
    });
    await historyEntry.save();
  }
  res.render("mockApi", { data, error });
});

module.exports = router;
