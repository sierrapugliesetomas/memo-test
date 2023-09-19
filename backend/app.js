const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const scoresRoutes = require("./routes/scores.js");

const app = express();

mongoose
  .connect("mongodb+srv://tomas123:tomas123@cluster0.mf5hv.mongodb.net/test")
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "*"
  );
  next();
});

app.use("/api/scores", scoresRoutes);

module.exports = app;
