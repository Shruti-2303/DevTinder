const {adminAuth,userAuth} = require("./middlewares/auth");

const express = require("express");

const app = express();

//Handling auth middleware for all GET, POST ... requests
app.use("/admin",adminAuth)
app.get("/admin/getAllData",(req,res) => {
    //always use try catch method to handle errors
    try{
        throw new Error("sgjfehfoirehfoerh");
        res.send("Hello admin !!");
    }catch(err) {       
        res.status(500).send("Something went wrong");
    }
    console.log("Hello user !!");
    res.send("Hello user !!");
})

app.get("/user/getAllData",userAuth,(req,res) => {
    console.log("Hello user !!");                   //we can write in both the ways, either call the middleware through app.use or directly call it in the route.
    res.send("Hello user !!");
})

app.use("/",(err,req,res,next) => {
    if(err) {
        res.status(500).send("Something went wrong");
    }else {

    }
})
app.listen(3000, () => {
    console.log("Server successfully listening on port 3000");
})