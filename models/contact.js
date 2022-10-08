const Joi=require("joi")
const {Schema,model}=require("mongoose")



const contactSchema=new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  })

const handleSaveError=(error,data,next)=>{
const {name,code}=error;
error.status=(name==="MongoServerError" && code===11000) ? 409 : 400;
next();
}

contactSchema.post("save",handleSaveError)

  const Contact=model("contact", contactSchema)

  const addSchema=Joi.object({
    name:Joi.string().required(),
    email:Joi.string().required(),
    phone:Joi.string().required(),
    favorite:Joi.boolean(),
  },{versionKey:false, timestamps:true})

const schemas={
  addSchema,
}

  module.exports={
    Contact,
    schemas,
}