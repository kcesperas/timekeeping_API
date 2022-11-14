const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require ("./routes/user.route");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");


const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser({extended: false}));
app.use(express.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cors());


//routes
app.get("/", (req, res) => {
    res.send("home")
})

//errorHandler
app.use(errorHandler);


//router middleware
app.use("/api/users", userRoute);

 
const PORT = process.env.PORT || 5000;

// DB CONNECTION
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    })
    .catch((err) => console.log(err))