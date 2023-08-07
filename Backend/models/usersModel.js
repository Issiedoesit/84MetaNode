const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true
    },
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    dob:{
        type: Date,
        required: true,
        default:"01-01-2001"
    },
    password:{
        type: String,
        required:true
    },
    lastLogin:{
        type:Date,
        required:true,
        default:Date.now()
    }
}, {timestamps: true})

module.exports = mongoose.model("Users", usersSchema)