const mongoose = require("mongoose");


const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://Shruti2303:Mummy1976@mernapp.qnmhsay.mongodb.net/devTinder");
};

module.exports = connectDB;