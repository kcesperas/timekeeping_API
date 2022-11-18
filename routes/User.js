const express = require("express");
const { createUser, loginUser, logout, getUser, loginStatus, updateUser, changePassword, forgotPassword, resetPassword} = require("../controllers/user");

const router = express.Router();


router.post("/create-user", createUser);
router.post("/login", loginUser);
// router.get("/logout", logout);
router.get("/user-status", loginStatus);
// router.post("/forgotpassword", forgotPassword);
// router.put("/resetpassword/:resetToken", resetPassword);

module.exports = router