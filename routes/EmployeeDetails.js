const express = require("express");
const { createEmployeeDetails, getEmployeeDetails, updateEmployeeDetails, deleteEmployeeDetails } = require("../controllers/employeeDetails");
const router = express.Router();



router.post("/create", createEmployeeDetails);
router.get("/get/:id", getEmployeeDetails);
router.patch("/update/:id", updateEmployeeDetails);
router.delete("/delete/:id", deleteEmployeeDetails);

module.exports = router