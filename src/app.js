const {adminAuth,userAuth} = require("./middlewares/auth");
require("./config/database");
const express = require("express");

const app = express();

app.listen(3000, () => {
    console.log("Server successfully listening on port 3000");
})