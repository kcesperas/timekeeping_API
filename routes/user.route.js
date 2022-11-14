const express = require("express");
const { registerUser, loginUser, logout, getUser, loginStatus, updateUser} = require("../controllers/user.controller");
const router = express.Router();
const protect  = require("../middleware/authHandler")


router.post("/register", registerUser);
router.get("/login", loginUser);
router.get("/logout", logout);
router.get("/user", protect, getUser);
router.get("/loggedin", loginStatus);
router.patch("/update", protect, updateUser)


module.exports = router