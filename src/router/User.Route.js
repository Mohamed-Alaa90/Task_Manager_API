const express = require("express");
const router = express.Router();
const { register, login } = require("../controller/User.Controller.js");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
