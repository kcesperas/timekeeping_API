const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");

const app = express();


// DB CONNECTION
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
       
    })






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

const router = require("./routes/index");


//router middleware
app.use("/api/", router);
// app.use("/api/taskboard", taskboardRoute);




 
const PORT = process.env.PORT || 5000;



    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })