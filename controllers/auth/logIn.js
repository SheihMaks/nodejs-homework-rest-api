const bcrypt= require("bcryptjs");
const {User,schemasAuth}= require("../../models");
const {RequestError}=require("../../helpers")

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
    res.status(200).json({
        "token": "exampletoken",
        "user": {
            "email": user.email,
            "subscription": user.subscription,
            }
        })




}

module.exports= logIn;