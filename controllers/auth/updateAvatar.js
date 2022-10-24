const fs= require("fs/promises");
const path= require("path");
const {User}= require("../../models");
const {RequestError}= require("../../helpers");
const { json } = require("express");

const avatarDir= path.join(__dirname, "../../", "public", "avatar");

const updateAvatar= async(req,res)=>{
    try{
        const {_id}= req.user;
        const {path:tempUpload, originalname}= req.file;
        const extention= originalname.split('.').pop();
        const filename= `${_id}.${extention}`;
        const resultUpload= path.join(avatarDir, filename)
        await fs.rename(tempUpload, resultUpload);
        const avatarURL= path.join("avatars", filename);
        await User.findByIdAndUpdate(_id, {avatarURL});
        res.status(200).json({avatarURL})
    }
    catch(error){
        await fs.unlink(req.file.path);
        throw error
    }
}

module.exports= updateAvatar;