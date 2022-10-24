const express= require("express");

const authRouter=express.Router();

const {cntrlWrapper}= require("../helpers");

const {authenticate, upload}=require("../middlewares");

const cntrl= require("../controllers/auth");

authRouter.post('/signup',cntrlWrapper(cntrl.signUp))

authRouter.post('/login',cntrlWrapper(cntrl.logIn))

authRouter.get('/current',authenticate, cntrlWrapper(cntrl.getCurrent))

authRouter.get('/logout', authenticate, cntrlWrapper(cntrl.logOut))

authRouter.patch('/', authenticate, cntrlWrapper(cntrl.updateSubscription))

authRouter.patch('/avatars', authenticate, upload.single("avatar"), cntrlWrapper(cntrl.updateAvatar))

module.exports=authRouter;