const {Contact,schemas}=require("../../models");
const {RequestError}=require("../../helpers");

const updateContact= async (req, res, next) => {
    const {error}=schemas.addSchema.validate(req.body)
    if(error){
    throw RequestError(400,error.message)
    }
    const {body}=req.body
    const {contactId}=req.params;
    const result=await Contact.findByIdAndUpdate(contactId,body)
    if(!result){
    throw RequestError(404,'Not found')
    }
        res.json(result)
}

module.exports=updateContact;