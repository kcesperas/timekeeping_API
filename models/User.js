const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
    first_name: {
        type: String,
    },
    last_name:{
        type:String,
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        uniqe: true,
        trim: true,
        match: [
             /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
             "please enter a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "password must be a minimum of 6 characters and a maximum of 20"]
    },
    suspendedAt: {
        type: Date,
        required: false
    },
    notes: {
        type: String
    },
  
},


{
    timestamps: true,
  }
  )  

    //encrypt password
    UserSchema.pre("save", async function(next) {
        if(!this.isModified("password")) {
            return next()
        } 

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword
    })


const User = mongoose.model("User", UserSchema);
module.exports = User;