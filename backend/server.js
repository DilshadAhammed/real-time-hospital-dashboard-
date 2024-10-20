const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI)


const app = express();
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", require("./routes/userRouter"))


app.listen(5000, ()=>{
    try{
        console.log("Server is running on port 5000");
    }
    catch(err){
        console.log(err);
    }
})
