const signUp= require("./signUp");
const verify= require("./verify");
const resendVerify= require("./resendVerify");
const logIn= require("./logIn");
const getCurrent= require("./getCurrent");
const logOut= require("./logOut");
const updateSubscription= require("./updateSubscription");
const updateAvatar= require("./updateAvatar");

module.exports={
    signUp,
    verify,
    resendVerify,
    logIn,
    getCurrent,
    logOut,
    updateSubscription,
    updateAvatar,
}