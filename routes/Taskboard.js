const express = require("express");
const { createTaskboard, getTaskboard, updateTaskboard, deleteTaskboard } = require("../controllers/taskboard.controller");
const router = express.Router();



router.post("/create", createTaskboard);
router.get("/get/:id", getTaskboard);
router.patch("/update/:id", updateTaskboard);
router.delete("/delete/:id", deleteTaskboard);

module.exports = router