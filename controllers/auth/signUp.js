const bcrypt= require("bcryptjs");
const {User, schemasAuth}= require("../../models");
const {RequestError}= require("../../helpers");

const signUp=async(req,res)=>{
    const {error}= schemasAuth.schemaRegistration.validate(req.body)
    if(error){
        throw RequestError(400)
    }
    const {email,password}=req.body;
    const user= await User.findOne({email});
    if(user){
        throw RequestError(409, "Email in use")
    }
    const hashPassword= await bcrypt.hash(password,10)
    const result= await User.create({email,password:hashPassword})
    res.status(201).json({
        email:result.email,
        subscription:result.subscription,
    })
}

module.exports= signUp