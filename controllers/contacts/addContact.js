const {RequestError}=require("../../helpers");
const {Contact,schemas}=require("../../models");

const addContact= async (req, res) => {
    const {error}=schemas.addSchema.validate(req.body)
    if(error){
    throw RequestError(400)
    }
    const {body}=req;
    const{_id:owner}=req.user;
    const result= await Contact.create({...body,...owner})
    res.status(201).json(result)
}

module.exports=addContact;