const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");

const app = express();

// Body parser middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// CORS middleware
app.use(cors({ origin: true, credentials: true }));

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Link the routers
app.use("/api/auth", require("./router/auth"));
app.use("/api/answer", require("./router/answer/AnswerCrud.js"));
app.use("/api/question", require("./router/question/QuestionCrud.js"));
app.use("/api/question/public", require("./router/question/QuestionPublic.js"));
app.use("/api/user", require("./router/user.js/UserProfiles.js"));
// Root route
app.get("/", (req, res) => {
  console.log("Hello Askoverflow!!");
  res.send("Hello Askoverflow!!");
});

// Uncomment the following lines to run the server locally
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports.handler = serverless(app);
