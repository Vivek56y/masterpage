const express = require("express");
const { register, login } = require("../controllers/Authcontrollers");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;