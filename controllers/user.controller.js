 const asyncHandler = require("express-async-handler");
 const User = require("../models/user.model");
 const bcrypt = require("bcrypt");
 const jwt = require("jsonwebtoken");
 

 const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"})
 }

    //REGISTER USER

 const registerUser = asyncHandler ( async (req, res) => {
      const {name, email, password} = req.body
      //validation
      if (!name || !email || !password) {     
      res.status(400)
      throw new Error("Please fill in all required fields")
  }
  if (password.length < 6) {
      res.status(400)
      throw new Error("Password must be a minimum of 6 characters")
  }





    // CHECK IF USER EXISTS
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error("duplicate email")
    }




    // CREATE USER
    const user = await User.create({
        name,
        email, 
        password
    });;


    // GENERATE TOKEN
    const token = generateToken(user._id)



    // SEND HTTP COOKIE
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), //1 day
      sameSite: "none",
      secure: true
    })

        if (user) {
            const {_id, name, email, photo, phone, bio} = user
            res.status(201).json({
                _id, 
                name, 
                email, 
                photo, 
                phone, 
                bio,
                token,
        })
        }else {
            res.status(400)
            throw new Error("invalid data")
        }

 });



    //LOGIN USER
    const loginUser = asyncHandler( async (req, res) => {
      res.send("logged in")
    });

 module.exports = {
    registerUser,
    loginUser
}