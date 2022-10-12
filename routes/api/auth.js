const express= require("express");

const router=express.Router();

const cntrlWrapper= require("../../helpers");

const cntrl= require("../../controllers/auth");

router.post('/users/signup', cntrlWrapper(cntrl.signUp))

module.exports=router;