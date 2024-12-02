const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type : String,
        required : true,
        minLength : 4,
        maxLength : 50,
        trim : true
    },
    lastName: {
        type: String,
        minLength : 4,
        maxLength : 50,
        trim : true
    },
    emailId: {
        type: String,
        required : true,
        trim : true,
        lowercase : true,
        unique : true
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min : 18
    },
    gender: {
        type: String,
        validate : function(value) {
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        }
    },
    skills: {
        type: [String],

    }
},
{
    timestamps : true
});

const User = mongoose.model("User", userSchema);

module.exports = User;