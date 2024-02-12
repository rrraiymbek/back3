const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const { connectToMongoDB } = require("./db");
const session = require("express-session");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect(
  "mongodb+srv://mmm:LbxRXGEb1wVQnrYw@cluster09870.wg9pfdf.mongodb.net/?retryWrites=true&w=majority",
 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const userRouter = require("./routes/userPanel");
const adminRouter = require("./routes/adminPanel");
const registerRouter = require("./routes/registration");
const loginRouter = require("./routes/login");
const weatherApi = require("./routes/weatherApi");
const currencyApi = require("./routes/currencyApi");
const history = require("./routes/history");
const mockApi = require("./routes/mockApi");
app.use(
  session({
    secret: "123",
    resave: false,
    saveUninitialized: true,
  })
);

connectToMongoDB()
  .then((client) => {
    app.locals.db = client.db();
    app.use("/", registerRouter);
    app.use("/", loginRouter);
    app.use("/admin", adminRouter);
    app.use("/user", userRouter);
    app.use("/", weatherApi);
    app.use("/", currencyApi);
    app.use("/", history);
    app.use("/", mockApi);
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas", error);
  });
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
