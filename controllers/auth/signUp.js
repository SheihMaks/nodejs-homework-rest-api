const {User, schemasAuth}= require("../../models");
const {RequestError}= require("../../helpers");

const signUp=async(req,res)=>{
    console.log(req.body)
    const {error}= schemasAuth.schemaRegistration.validate(req.body)
    if(error){
        throw RequestError(400)
    }
    const {email,password}=req.body;
    const user= await User.findOne({email});
    if(user){
        throw RequestError(409, "Email in use")
    }
    const result= await User.create({email,password})
    res.status(201).json({
        email:result.email,
        subscription:result.subscription,
    })
}

module.exports= signUp