import User from "../model/UserModel.js"
import bcrypt from "bcrypt"


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

}
export default Controller