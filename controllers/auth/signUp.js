const bcrypt= require("bcryptjs");
const gravatar= require("gravatar");
const nanoid= require("nanoid");
const {User, schemasAuth}= require("../../models");
const {RequestError, sendEmail, createVerifyMail}= require("../../helpers");



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
    const hashPassword= await bcrypt.hash(password,10);
    const avatarURL= gravatar.url(email);
    const verificationToken= nanoid();
    const result= await User.create({email, password:hashPassword, avatarURL, verificationToken})
    const mail= createVerifyMail(email, verificationToken);
    await sendEmail(mail)
    res.status(201).json({
        email:result.email,
        subscription:result.subscription,
    })
}

module.exports= signUp