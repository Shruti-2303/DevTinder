const express = require("express");

const app = express();

app.use("/hello",(req,res) => {
    res.send("Hello Hello World");
})

app.use("/", (req,res) => {
    res.send("Hello World !!!");
})

app.listen(3000, () => {
    console.log("Server successfully listening on port 3000");
})