const jwt= require("jsonwebtoken");
const {User}= require("../models")
const {RequestError}= require("../helpers");
const {SECRET_KEY}=process.env;

const authenticate=async(req,res,next)=>{
    try{
        const {authorization=""}= req.headers;
        console.log(authorization)
        
        const [bearer,token]= authorization.split(" ");
        console.log(bearer)
        console.log(token)
        if(bearer!=="Bearer"){
            throw RequestError(401)
        }
        try{
            
            const{id}= jwt.verify(token,SECRET_KEY);
            console.log(id)
            const user= await User.findById(id);
            if(!user){
                throw Error("Unatorized")
            }
            next()
        } 
        catch(error){
            throw RequestError(401)
        }
        } 
    catch(error){
        next(error)
    }
}

module.exports= authenticate;