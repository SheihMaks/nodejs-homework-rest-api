const Joi= require("joi");
const {Schema,model}= require("mongoose");
const {handleSaveErrors}= require("../middlewares");


const userSchema= new Schema ({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },
},{versionKey:false,timestamps:true})

userSchema.post("save",handleSaveErrors);

const User=model("user", userSchema);

const schemaRegistration=Joi.object({
    name:Joi.string().required(),
    email:Joi.string().required(),
    password:Joi.string().required(),
    
})

const schemaLogin=Joi.object({
    email:Joi.string().required(),
    password:Joi.string().required(),
})

const schemasAuth={
    schemaRegistration,
    schemaLogin,
}

module.exports={
    User,
    schemasAuth
}