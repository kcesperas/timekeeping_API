const mongoose = require("mongoose");
const roleSchema = mongoose.Schema({
    name: String,
    notes: String,
    isDeleted: {
        type: Boolean,
        default: false
    }
  });
  


const Role = mongoose.model("Role", roleSchema)
module.exports = Role;