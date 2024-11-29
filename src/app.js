const {adminAuth,userAuth} = require("./middlewares/auth");
const connectDB = require("./config/database");
const User = require("./models/user");
const express = require("express");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
    const user = new User(req.body);
    try{
        await user.save();
        res.send("User signed up successfully");
    }catch{
        res.status(500).send("Something went wrong");
    }
    
    
})

connectDB().then(() => {
    console.log("Connected to MongoDB");
    app.listen(7000, () => {
        console.log("Server successfully listening on port 7000");
    })
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});
