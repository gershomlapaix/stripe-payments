const dotenv = require("dotenv");
dotenv.config({ path: "./.env" }); // load the environment variables
const express = require("express");

const app = express();

app.use(express.json());

module.exports = app;