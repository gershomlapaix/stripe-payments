const dotenv = require("dotenv");
dotenv.config({ path: "./.env" }); // load the environment variables
const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

module.exports = app;
