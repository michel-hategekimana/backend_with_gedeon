import User from "../model/UserModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


class Controller{
    static signup=async(req,res)=>{
       const {name,email,password,role}=req.body
       try {
       const hashPassword= bcrypt.hashSync(req.body.password,10)
        const user= await User.create({name,email,password:hashPassword,role})
        if(!user){
         return   res.status(404).json({message:"user not found"})
        }else{
            res.status(201).json({message:"user created successfully",user})
        }
       } catch (error) {
        console.log(error)
        return res.status(500).json({message:"failed to create a user"})
       }

    }
    static login=async(req,res)=>{
        const {email,password}=req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"Invalid email"})
        }else{
            const comparePassword= bcrypt.compareSync(password,user.password);
            if(!comparePassword){
                return res.status(404).json({message:"Invalid password"})
            }else{
                const token= jwt.sign({user:user},process.env.SECRET_KEY,{expiresIn:"1d"})
                return res.status(200).json({message:"login successful",token})

            }
        }
       

    };
    static deleteOneUser =async(req,res)=>{
        const {id}=req.params
        const user=await User.findByIdAndDelete(id)
        if(!user){
            return res.status(404).json({message:"user not found"})
        }else{
            return res.status(200).json({message:"user deleted successfully"})
        }

    };

    static getAllUsers =async(req,res)=>{
      
        const users = await User.find()
        if(!users){
            return res.status(404).json({message:"users not found"})
        }else{
            return res.status(200).json({message:"users found successfully",users})
        }

    };

    static getOneUser=async(req,res)=>{
        const id=req.params.id
        const user= await User.findById(id)
        if(!user){
            return res.status(404).json({message:"user not found"})
        }else{
            return res.status(200).json({message:"user found successfully",user})
        }
    };
    static updateOneUser=async(req,res)=>{
        const id = req.params.id
        const user =await User.findByIdAndUpdate(id,req.body,{new:true})
       if(!user){
            return res.status(404).json({message:"user not found"})
        }else{
            return res.status(200).json({message:"user updated successfully",user})
        }
    };

    static deleteAllUsers=async(req,res)=>{
        const user=await User.deleteMany()
        if(!user){
            return res.status(404).json({message:"users not deleted"})

        }else{
            return res.status(200).json({message:"all users deleted"})
        }
    }


}
export default Controller