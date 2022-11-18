const express = require("express");
const protect = require("../middleware/authHandler");

const { getUser, updateUser, changePassword } = require("../controllers/user");

const router = express.Router()

router.get("/me", protect, getUser);
router.patch("/update", protect, updateUser);
router.patch("/update", protect, updateUser);
router.patch("/changepassword", protect, changePassword);


module.exports = router