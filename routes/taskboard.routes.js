const express = require("express");
const { createTaskboard, getTask, updateTask, deleteTask } = require("../controllers/taskboard.controller");
const router = express.Router();



router.post("/create", createTaskboard);
router.get("/get/:id", getTask);
router.patch("/update/:id", updateTask);
router.delete("/delete/:id", deleteTask);

module.exports = router