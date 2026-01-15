import mongoose from "mongoose";





const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['client','provider','admin'],
        default:'client'

    },
    createdAt:{
        type:Date,
        default:new Date(Date.now())

    }

})
const User = mongoose.model("User",userSchema)

export default User