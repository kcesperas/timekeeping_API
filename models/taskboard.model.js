const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const taskboardSchema = mongoose.Schema({
    subject: {
        type: String,
    },
    content:{
        type:String,
    },
    status: {
        type: String,

    },
    start_date: {
        type: Date,
   
    },
    end_date: {
        type: Date,
        
    },
    assigned_to:{
        type: String,
    },
    notes: {
        type: String
    }
},

{
    timestamps: true,
}
);


const Taskboard = mongoose.model("Taskboard", taskboardSchema);
module.exports = Taskboard;