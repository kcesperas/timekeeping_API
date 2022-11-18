 const asyncHandler = require("express-async-handler");
 const User = require("../models/User");
 const bcrypt = require("bcrypt");
 const jwt = require("jsonwebtoken");
 const emailSender = require("../utils/emailSender")
 
 const Token = require("../models/Token");
 const crypto = require("crypto");

 const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"})
 }

    //create USER

 const createUser = asyncHandler ( async (req, res) => {
      const {first_name, last_name, email, password} = req.body
      //validation
      if (!first_name ||!last_name || !email || !password) {     
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
        first_name,
        last_name,
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
            const {_id, first_name, last_name, email, notes} = user
            res.status(201).json({
                _id, 
                first_name, 
                last_name,
                email, 
                notes,
                token
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
               const {_id, first_name, last_name, email, notes} = user
            res.status(200).json({
                _id, 
                first_name,
                last_name, 
                email, 
                notes,
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
      const user = await User.findById(req.user._id)

        if (user) {
            const {_id, first_name, last_name, email, notes, } = user;
            res.status(200).json({
                _id, 
                first_name, 
                last_name,
                email, 
                notes,
                
        });
        } else {
            res.status(400)
            throw new Error("user not found")
        }

      
    });



    //GET LOGIN STATUS 
  const loginStatus = asyncHandler (async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      return res.json(false)
    }


    //Verifiy Token
     const verified = jwt.verify(token, process.env.JWT_SECRET)
     if(verified) {
      return res.json(true);
     }
  });

  //UPDATE USER
  const updateUser = asyncHandler (async(req, res) => {
    const user = await User.findById(req.user._id)

        if (user) {
          const {first_name, last_name, email, notes} = user;
          user.email = email;
          user.first_name = req.body.first_name || first_name;
          user.last_namee = req.body.last_name || last_name;
          user.notes = req.body.notes || notes;
      

          const updatedUser = await user.save()
            res.status(200).json({ 
                message: "ACCOUNT UPDATED SUCCESFULLY",
                _id: updatedUser._id,
                name: updatedUser.first_name,
                email: updatedUser.last_name,
                photo: updatedUser.email,
                phone: updatedUser.notes

        })
        } else {
          res.status(404)
          throw new Error("User not found")
        }
      

    
  });



      //CHANGE PASSWORD
      const changePassword = asyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id);
        const {oldPassword, password} = req.body

        if(!user) {
          res.status(400);
          throw new Error("Account not found");
        }

      //Validate
      if(!oldPassword || !password) {
        res.status(400);
        throw new Error("Please add current and new password")
      }

      // To check if password is correct
      const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password)

      // Save new Password

      if (user && passwordIsCorrect) {
        user.password = password
        await user.save()
        res.status(200).send("password updated succesfully")
      } else {
        res.status(400);
        throw new Error("Old password is incorrect")
      }
      });

      const forgotPassword = asyncHandler (async (req, res) => {
        const {email} = req.body
        const user = await User.findOne({email})

        if (!user) {
          res.status(404);
          throw new Error("User does not exist")
        }


        //DELETE EXISTING TOKENS IN DB
        let token = await Token.findOne({userId: user._id})
        if (token) {
          await token.deleteOne()
        }


        //Create Forgot password token
        let resetToken = crypto.randomBytes(32).toString("hex") + user._id
        console.log(resetToken);

        //Hash token before saving to DB
        const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex")

     
        // SAVE TOKEN TO DB
        await new Token({
          userId: user._id,
          token: hashedToken,
          createdAt: Date.now(),
          expiresAt: Date.now() + 30 * (60 * 1000) //Thirty minutes
        }).save();


        //Construct Reset Url
        const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`


        // Reset Email
        const message = `
          <h2> Hello ${user.name} </h2>
          <p> Please use the url below </p>
          <p> This reset link is only valid for 30 minutes </p>

          <a href=${resetUrl} clicktracking=off> ${resetUrl}</a>

          <p>Best Regards</p>
          <p>BT Dev </p>
        `;

        const subject = "Password Reset Request"
        send_to = user.email
        sent_from = process.env.EMAIL_USER



        try {
            await emailSender(subject, message, send_to, sent_from);
            res.status(200).json({success: true, message: "reset email sent"});
        } catch (err) {
          console.log(err)
            res.status(500);
            throw new Error("Email is not sent please try again")
        }   
      
});

    //RESET PASSWORD

const resetPassword = asyncHandler (async(req, res) => {
  const {password} = req.body;
  const {resetToken} = req.params;

          //Hash token then compare to db
        const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex")

        //Find token inDb

        const userToken = await Token.findOne({
          token: hashedToken,
          expiresAt: {$gt: Date.now()}
        })

        if (!userToken) {
          res.status(404);
          throw new Error("Invalid or expired token")
        }

        //Find User
        const user = await User.findOne({
          _id: userToken.userId
        })
        user.password = password
        await user.save() 
        res.status(200).json({message: "password has been rest succesfully",})




})

    


 module.exports = {
    createUser,
    loginUser,
    logout,
    getUser,
    loginStatus,
    updateUser,
    changePassword,
    forgotPassword,
    resetPassword
}