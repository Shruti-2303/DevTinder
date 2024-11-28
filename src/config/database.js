const mongoose = require("mongoose");


const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://Shruti2303:Mummy1976@mernapp.qnmhsay.mongodb.net/");
};

connectDB().then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});