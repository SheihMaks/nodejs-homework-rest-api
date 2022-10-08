const {Contact,schemas}=require("../../models");
const {RequestError}=require("../../helpers");

const updateFavorite=async(req,res)=>{
    const {error}=schemas.updateFavoriteSchema.validate(req.body)
    if(error){
        RequestError(400, "missing field favorite")
    }
    const {contactId}=req.params;
    const {body}=req.body;
    const result=await Contact.findByIdAndUpdate(contactId,body,{new:true})
    if(!result){
        throw RequestError(404, 'Not found')
    }
    res.json(result)
}

module.exports=updateFavorite