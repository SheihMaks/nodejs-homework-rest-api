const Joi= require("joi");
const {Schema,model}= require("mongoose");
const {handleSaveErrors}= require("../helpers");

const subscriptionTypes=["starter", "pro", "business"];

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
        enum: subscriptionTypes,
        required:true,
        default: "starter"
    },
    avatarURL:{
        type:String,
        required:true,
    },
    token: {
        type: String,
        default: null,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    }

},{versionKey:false,timestamps:true})

userSchema.post("save",handleSaveErrors);

const User=model("user", userSchema);

const schemaRegistration=Joi.object({
    email:Joi.string().required(),
    password:Joi.string().required(),
    subscription:Joi.string().valid(...subscriptionTypes),
})

const verifyEmailSchema= Joi.object({
    email: Joi.string().required(),
})

const schemaLogin=Joi.object({
    email:Joi.string().required(),
    password:Joi.string().required(),
})

const updateSubscriptionSchema=Joi.object({
    subscription:Joi.string().valid(...subscriptionTypes).required(),
})

const schemasAuth={
    schemaRegistration,
    verifyEmailSchema,
    schemaLogin,
    updateSubscriptionSchema,
}

module.exports={
    User,
    schemasAuth
}