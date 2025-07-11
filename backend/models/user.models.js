import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    edited: {
        type: Boolean,
    },
    profileImageUrl:{
        type:String,
        default:"null"
    },
},{timestamps:true})


const User = mongoose.model("User",userSchema);
export default User;