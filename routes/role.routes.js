const express = require("express");
const { createRole, getRole, updateRole, deleteRole } = require("../controllers/role.controller");
const router = express.Router();
const protect  = require("../middleware/authHandler")


router.post("/create", createRole);
router.get("/get/:id", getRole);
router.patch("/update/:id", updateRole);
router.delete("/delete/:id", deleteRole);

module.exports = router