import User from "../model/UserModel.js"



export async function EmailExist(req,res,next) {
    const {email}=req.body
    const user = await User.findOne({email})
    if(user){
        return res.status(403).json({message:"email already exist"})

    }else{
        return next()
    }
    
}