const express = require("express");
const { createUser, loginUser, logout, getUser, loginStatus, updateUser, changePassword, forgotPassword, resetPassword} = require("../controllers/user.controller");
const router = express.Router();
const protect  = require("../middleware/authHandler")


router.post("/create", createUser);
router.get("/login", loginUser);
router.get("/logout", logout);
router.get("/user", protect, getUser);
router.get("/loggedin", loginStatus);
router.patch("/update", protect, updateUser);
router.patch("/changepassword", protect, changePassword);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword);

module.exports = router