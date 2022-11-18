const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const timelogsSchema = mongoose.Schema({
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
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    assigned_to:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    notes: {
        type: String
    }
},

{
    timestamps: true,
}
);

    //encrypt password
    timelogsSchema.pre("save", async function(next) {
        if(!this.isModified("password")) {
            return next()
        } 

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword
    })

const Timelogs = mongoose.model("Timelogs", timelogsSchema);
module.exports = Timelogs;