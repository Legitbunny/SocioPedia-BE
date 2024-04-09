const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min:2,
        max:50,
    },
    lastName: {
        type: String,
        required: true,
        min:2,
        max:50,
    },
    email: {
        type: String,
        required: true,
        max:50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min:5,
        max:50,
    },
    picturePath: {
        type: String,
        required: true,
        default: ''
    },
    friend:{
        type: Array,
        default:[]
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number
}, 
{timestamps: true});


module.exports = mongoose.model("User", userSchema)
