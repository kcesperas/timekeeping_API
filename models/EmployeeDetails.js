const mongoose = require("mongoose");



const employee_detailsSchema = mongoose.Schema({

    employee_name: {
        type: String,
    },
    employee_position:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "roles"
    },
    contact_number:{
        type:String,
    },
    assigned_email: {
        type: String,
    },
    address: {
        type: String,
    },
    date_hired: {
        type: Date,
    },
    employment_period: {
        type: Date && Date,
    },
    employment_status:{
        type: String,
    },
    salary:{
        type: Number,
    },
    notes:{
        type: String
    }
},

{
    timestamps: true,
}
);


const Employee_details = mongoose.model("Employee_details", employee_detailsSchema);
module.exports = timelogs;