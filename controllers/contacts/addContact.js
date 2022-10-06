const {RequestError}=require("../../helpers");
const {Contact,addSchema}=require("../../models");

const addContact= async (req, res) => {
    const {error}=addSchema.validate(req.body)
    if(error){
    throw RequestError(400, error.message)
    }
    const {body}=req;
    const result= await Contact.create(body)
    res.status(201).json(result)
}

module.exports=addContact;