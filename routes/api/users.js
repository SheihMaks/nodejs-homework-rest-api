const express= require("express");

const router=express.Router();

const {cntrlWrapper}= require("../../helpers");

const {authenticate}=require("../../middlewares");

const cntrl= require("../../controllers/auth");

router.post('/signup',cntrlWrapper(cntrl.signUp))

router.post('/login',cntrlWrapper(cntrl.logIn))

router.get('/current',authenticate, cntrlWrapper(cntrl.getCurrent))

router.get('/logout', authenticate, cntrlWrapper(cntrl.logOut))

router.patch('/', authenticate, cntrlWrapper(cntrl.updateSubscription))

module.exports=router;