const {adminAuth,userAuth} = require("./middlewares/auth");
const connectDB = require("./config/database");
const User = require("./models/user");
const express = require("express");
const { validateSignUp } = require("./utils/validation");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());
app.patch("/update",async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    try{
        await User.findByIdAndUpdate(userId,data,{runValidators : true});
        res.send("User updated successfully");
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
app.post('/login', async(req,res) => {
    try{
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId : emailId});
        if(!user){
            throw new Error("Invalid credentials");
        }
        
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            throw new Error("Invalid credentials");
        }
        else{
            res.send("User logged in successfully");
        }
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
})
app.post("/signup", async (req, res) => {

    try{
        const {firstName, lastName, emailId, password} = req.body;
        //validate the user data
        validateSignUp(req);
        //Encrypt the password
        const passwordHash = await bcrypt.hash(password,10);
        //Save the user
        const user = new User({
            firstName,
            lastName,    
            emailId,
            password : passwordHash,
        });
        
            await user.save();
            res.send("User signed up successfully");
    }catch(err){
        res.status(500).send("ERROR : " + err.message);
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
