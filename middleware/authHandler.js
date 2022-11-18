 const ErrorResponse = require("../utils/errorResponse")
 const asyncHandler = require("express-async-handler");
 const User = require("../models/User");
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
    User = await User.findById(verified.id).select("-password")
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

const authorize = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return 
        next(new ErrorResponse(403, "Unauthorized access"));
    }
    next();
};

 module.exports = protect, authorize;