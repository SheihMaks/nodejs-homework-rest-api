const {User, schemas}= require("../../models");

const {RequestError, sendEmail, createVerifyMail}= require("../../helpers");


const resendVerify= async(req,res)=>{
    const {error}= schemas.verifyEmailSchema(req.body)
    if(error){
        throw RequestError(400, "missing required field email");
    }
    const {email}= req.body;
    const user= await User.findOne({email})
    if(!user){
        throw RequestError(400, "Email not found")
    }  
    if(user.verify){
        res.status(400).json({
        message: "Verification has already been passed"})
        return
    }
    const mail= createVerifyMail(email, user.verificationToken);
    await sendEmail(mail)
    res.status(200).json({
        "message": "Verification email sent"
    })
    }


module.exports= resendVerify;