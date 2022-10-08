const {Contact}=require("../../models");

const {RequestError}=require("../../helpers");

const getById= async (req, res, next) => {
    const {contactId}=req.params;
    console.log(contactId)
    
    const result= await Contact.findById(contactId)
    if(!result){
    throw RequestError(404,'Not found') 
    }
    res.json(result)
}

module.exports=getById;