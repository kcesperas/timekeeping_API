const express = require("express");
const authRouter = require("./auth");
const userRouter = require("./user");
const taskboardRouter = require("./taskboard");
const employeeDetailsRouter = require("./employeeDetails");

const { protect, authorize } = require("../middleware/authHandler");


const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter)
router.use("/taskboard", taskboardRouter)
// router.use("/employed", employeeDetailsRouter)

module.exports = router