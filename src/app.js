const {adminAuth,userAuth} = require("./middlewares/auth");
const connectDB = require("./config/database");
const User = require("./models/user");
const express = require("express");

const app = express();

app.use(express.json());
app.delete("/delete", async(req,res) => {
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    }catch(err){
        res.status(400).send("Something went wrong" + err.message);
    }
})
app.get("/users", async(req,res) => {
    const userEmail = req.body.emailId;

    try{
        const users = await User.find({emailId : userEmail});
        res.send(users);
    }catch(err){
        res.status(400).send("Something went wrong" + err.message);
    }

})
app.get("/feed", async(req,res) => {
    try{
        const users = await User.find({});
        res.send(users);
    }catch(err){
        res.status(400).send("Something went wrong" + err.message);
    }
})
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
