const {User, schemasAuth}= require("../../models");
const {RequestError}= require("../../helpers");

const signUp=async(req,res)=>{
    const {error}= schemasAuth.schemaRegistration.validate(req.body)
    if(error){
        throw RequestError(400)
    }
    const {name,email,password}=req.body;
    const user= await User.findOne({email});
    if(user){
        throw RequestError(409, "Email in use")
    }
    const result= await User.create({name,email,password})
    res.status(201).json({
        name:result.name,
        email:result.email,
    })
}

module.exports= signUp