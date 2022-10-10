const nodemailer = require("nodemailer");
const debug = require('debug')('app:Debug');

const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: process.env.GMAIL_ADRESS,
    pass: process.env.GMAIL_PASSWORD,
    },
});

contactEmail.verify((error) => {
    if (error) {
        debug(error);
    } else {
        debug("Ready to Send");
    }
});

const resetPasswordEmail =  (email, token) => {
    return {
    from: "Transmission des savoirs",
    to: email,
    subject: "Réinitialisez votre mot de passe",
    html: `<p>Bonjour,</p>
           <p>Une demande de réinitialisation de mot de passe a été générée.<br />
              Si celle-ci ne provient pas de vous merci de ne pas tenir compte de cet email.</p>
           <p>Sinon, voici un lien vous permettant de réinitiliser votre mot de passe :
           <a href='${process.env.URL}/nouveau-mot-de-passe?${token}'>Réinitisaliser mon mot de passe.</a></p>
           <p>Si ce lien ne fonctionne pas vous pouvez coller cette adresse dans votre navigateur : <br />
           ${process.env.URL}/nouveau-mot-de-passe?${token}</p>`,
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

 module.exports = { contactEmail, resetPasswordEmail, formMessage };
