const {User, schemasAuth}= require("../../models");
const {RequestError}=require("../../helpers");

const updateSubscription= async(req,res)=>{
    const {error}= schemasAuth.updateSubscriptionSchema.validate(req.body);
    if(error){
        throw RequestError(400, "field subscription has is not valid value")
    }
    const {_id,email}= req.user;
    const result= await User.findByIdAndUpdate(_id, req.body,{new:true})
    res.status(200).json({
        email,
        "subscription":result.subscription,
    })
}

module.exports= updateSubscription;