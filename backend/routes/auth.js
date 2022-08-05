const express = require("express");
const authController = require("./../controllers/authController");
const router = express.Router();

router.route("/create").post(authController.signUp);
router.route("/login").post(authController.signIn);

module.exports = router;
