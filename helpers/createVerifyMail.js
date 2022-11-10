const {BASE_URL}= process.env;

const createVerifyMail=(email, verificationToken)=>{
const mail= {
    to:email,
    subject: "Потверждение регистрации.",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}"></a>`
}
return mail
}

module.exports= createVerifyMail;