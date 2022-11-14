 const asyncHandler = require("express-async-handler");
 const User = require("../models/user.model");
 const jwt = require("jsonwebtoken")


 const protect = asyncHandler (async (req, res, next) => {
    try {
        const token = req.cookies.token
        if(!token) {
            res.status(401)
            throw new Error("not logged in")
        }
    //Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    //Get user ID from token
    user = await User.findById(verified.id).select("-password")
         if (!user) {
            res.status(401)
            throw new Error("Account not found")
    }
        req.user = user
        next()
    } catch (error) {
            res.status(401)
            throw new Error("not authorized, please log in")
    }
 });

 module.exports = protect;