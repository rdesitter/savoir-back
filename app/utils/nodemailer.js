const nodemailer = require("nodemailer");
const debug = require('debug')('app:Debug');
const smtpTransport = require('nodemailer-smtp-transport');
const xoauth2 = require('xoauth2')
//https://stackoverflow.com/questions/51980436/nodemailer-throws-error-invalid-login-534-5-7-14/51981381#51981381
//https://accounts.google.com/DisplayUnlockCaptch
//Refresh token if necessary :
//https://stackoverflow.com/questions/24098461/nodemailer-gmail-what-exactly-is-a-refresh-token-and-how-do-i-get-one
const contactEmail = nodemailer.createTransport(smtpTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        xoauth2: xoauth2.createXOAuth2Generator({
            type: 'OAuth2',
            user: process.env.GMAIL_ADRESS,
            pass: process.env.GMAIL_PASSWORD,
            clientId: process.env.NODEMAILER_CLIENTID,
            clientSecret: process.env.NODEMAILER_CLIENTSECRET,
            refreshToken: process.env.NODEMAILER_REFRESHTOKEN
        })
    },
}));




const mailOptions =  (email, token) => {
    return {
        from: "Transmission des savoirs",
        to: email,
        subject: "Réinitialisez votre mot de passe",
    html: `<p>Bonjour,</p>
    <p>Une demande de réinitialisation de mot de passe a été générée pour l'adresse ${email}.<br />
    Si celle-ci ne provient pas de vous merci de ne pas tenir compte de cet email.</p>
    <p>Sinon, voici un lien vous permettant de réinitiliser votre mot de passe :
    <a href='https://savoir.surge.sh/nouveau-mot-de-passe?${token}'>Réinitisaliser mon mot de passe.</a></p>
    <p>Si ce lien ne fonctionne pas vous pouvez coller cette adresse dans votre navigateur : <br />
    https://savoir.surge.sh/nouveau-mot-de-passe?${token}</p>`,
}
};

const formMessage = (datas) => {
    return {
        from: `Formulaire de contact <${process.env.GMAIL_ADRESS}>`,
        to: process.env.GMAIL_ADRESS,
        subject: "Nouveau message",
        html:   `<p>Vous avez reçu un nouveau message depuis le formulaire de contact.</p>
        <p>Email : ${datas.email}
        <p>Nom : ${datas.fullname} </p>
        <p>Message : <br />
        ${datas.message}</p>`,
    }
}
contactEmail.verify((error) => {
    if (error) {
        console.log('verfy',error);
    } else {
        console.log("Ready to Send");
    }
});

 module.exports = { contactEmail, mailOptions, formMessage };
