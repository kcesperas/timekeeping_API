const express = require("express");
const { createTimelogs, getTimelogs, updateTimelogs, deleteTimelogs } = require("../controllers/timelogs");
const router = express.Router();



router.post("/create", createTimelogs);
router.get("/get/:id", getTimelogs);
router.patch("/update/:id", updateTimelogs);
router.delete("/delete/:id", deleteTimelogs);

module.exports = router