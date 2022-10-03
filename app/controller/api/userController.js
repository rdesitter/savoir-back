const userDataMapper = require("../../models/user");
const {jwtTokens, authorizationMiddleware} = require("../../utils/jwt-helpers");
const bcrypt = require("bcrypt");
require("dotenv").config();
const client = require("../../config/db");
const { contactEmail, resetPasswordEmail, formMessage } = require("../../utils/nodemailer");
const jwt = require("jsonwebtoken");

const userController = {
  async login(req, res) {
    //fetch le user depuis la db basé sur l'email passé en paramètre

    try {
      const { email, password } = req.body;
      const user = await client.query('SELECT * FROM "user" WHERE email = $1', [
        email,
      ]);

      if (user.rows.length === 0)
        return res.status(401).json({ error: "Email is incorrect" });

      //check que le mot de passe du user est correct

      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].password
      );

      if (!validPassword) {
        return res.status(401).json("Incorrect password");
      }

      let tokens = jwtTokens(user.rows[0]);

      res.json({
        user: user.rows,
        tokens,
      });
    } catch (err) {
      console.trace(err);
      res.status(500).render(err.toString());
    }
  },

  async register(req, res) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = await client.query(
        'INSERT INTO "user" (email,password, pseudo ,birthdate, role_id) VALUES ($1,$2,$3,$4,$5) RETURNING *',
        [
          req.body.email,
          hashedPassword,
          req.body.pseudo,
          req.body.birthdate,
          req.body.role_id /* by default */,
        ]
      );

      let newTokens = jwtTokens(newUser.rows[0])
      res.json({
        newTokens,
        newUser : newUser.rows[0].id
      });
    } catch (err) {
      console.trace(err);
      res.status(500).render(err.toString());
    }
  },

  async delete(req, res) {
    const deleteUser = await userDataMapper.delete(req.params.id);
    return res.json(deleteUser);
  },


  async resetPassword(req, res) {
    debug('resetPassword', req.body);
    const { email } = req.body;

    const user = await client.query('SELECT * FROM "user" WHERE email = $1', [
      email,
    ]);

    if (user.rows.length === 0)
      return res.status(401).json({ status: "Nous n'avons trouvé aucun utilisateur avec cet email." });

    let newTokens = jwtTokens(user.rows[0])

    contactEmail.sendMail(resetPasswordEmail(email, newTokens.accessToken), (error) => {
      if (error) {
        res.json({ status: "Désolé le service est inactif pour le moment. Merci de ressayer dans quelques minutes." });
      } else {
        res.json({ status: "Un email contenant les instructions pour réinitialiser votre mot de passe vous a été envoyé." });
      }
    });
  },

  async setNewPassword(req, res) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const decode = authorizationMiddleware(req.headers.authorization);
      // debug(decode)
      const result = await client.query('UPDATE "user" SET password = $2 WHERE email = $1', [decode.email, hashedPassword]);
      // debug(result)
      if (result.rowCount === 1) {
        res.status(200).json({ message: "Votre mot de passe a bien été modifié." });
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json({ message: "Erreur serveur"});
    }
  },

  async edit(req, res) {
    const savedUser = await userDataMapper.edit(req.params.id, req.body);
    return res.json(savedUser);

  },

  async contactForm(req, res) {
    contactEmail.sendMail(formMessage(req.body), (error) => {
      if (error) {
        res.json({ status: "Désolé le service est inactif pour le moment. Merci de ressayer dans quelques minutes." });
      } else {
        res.json({ status: "Merci. Votre message a bien été envoyé, nous vous répondrons dans les plus brefs délais." });
      }
    })
  },

 
};

module.exports = userController;
