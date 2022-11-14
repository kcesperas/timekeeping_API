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
      
      const{email, password} = req.body

      //Validate Request 
      if (!email || !password) {
        res.status(400);
        throw new Error("Incorrect email or password")
      }

      // To check if user exists
      const user = await User.findOne({ email })

      if (!user) {
        res.status(400);
        throw new Error("Account does not exist")
      }

      // To check if password is correct
      const passwordIsCorrect = await bcrypt.compare(password, user.password)

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

      if (user && passwordIsCorrect) {
               const {_id, name, email, photo, phone, bio} = user
            res.status(200).json({
                _id, 
                name, 
                email, 
                photo, 
                phone, 
                bio,
                token
        });
      } else {
        res.status(400);
        throw new Error("Invalid email or password")
      }



    });


    //LOGOUT USER
    const logout = asyncHandler (async (req, res) => {
     res.cookie("token", "", {
      path: "/",
      httpOnly: true,
      expires: new Date(0), //1 day
      sameSite: "none",
      secure: true,
    });
    return res.status(200).json({message: "logged out succesfully"})

});


    //GET USER DATA
    const getUser = asyncHandler (async (req, res) => {
      res.send("User")
    });



    


 module.exports = {
    registerUser,
    loginUser,
    logout,
    getUser,
}