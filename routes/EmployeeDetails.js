const express = require("express");
const { createEmployee_details, getEmployee_details, updateEmployee_details, deleteEmployee_details } = require("../controllers/EmployeeDetails");
const router = express.Router();



router.post("/create", createEmployee_details);
router.get("/get/:id", getEmployee_details);
router.patch("/update/:id", updateEmployee_details);
router.delete("/delete/:id", deleteEmployee_details);

module.exports = router