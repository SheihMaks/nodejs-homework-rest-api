const Joi= require("joi");
const {Schema,model}= require("mongoose");
const {handleSaveErrors}= require("../helpers");


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
    email:Joi.string().required(),
    password:Joi.string().required(),
    subscription:Joi.string(),
})

const schemaLogin=Joi.object({
    email:Joi.string().required(),
    password:Joi.string().required(),
})

const updateSubscriptionSchema=Joi.object({
    subscription:Joi.string().required(),
})

const schemasAuth={
    schemaRegistration,
    schemaLogin,
    updateSubscriptionSchema,
}

module.exports={
    User,
    schemasAuth
}