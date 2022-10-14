const bcrypt= require("bcryptjs");
const jwt=require("jsonwebtoken")
const {User,schemasAuth}= require("../../models");
const {RequestError}=require("../../helpers")
const {SECRET_KEY}= process.env;

const logIn=async(req,res)=>{
    const {error}= schemasAuth.schemaLogin.validate(req.body);
    if(error){
        throw RequestError(400)
    }
    const{email,password}= req.body;
    const user= await User.findOne({email})
    if(!user){
        throw RequestError(401,"Email or password is wrong");
    }
    
    const passwordCompare= await bcrypt.compare(password,user.password)
    if(!passwordCompare){
        throw RequestError(401,"Email or password is wrong")
    }

    const payload={
        id:user._id
    }

    const token= jwt.sign(payload,SECRET_KEY,{expiresIn:"1h"})

    res.status(200).json({
        token,
        "user": {
            "email": user.email,
            "subscription": user.subscription,
            }
        })




}

module.exports= logIn;