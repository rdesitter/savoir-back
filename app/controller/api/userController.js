const userDataMapper = require("../../models/user");
const debug = require("debug")("app:Debug");
const {
  jwtTokens,
  authorizationMiddleware,
} = require("../../utils/jwt-helpers");
const bcrypt = require("bcrypt");
require("dotenv").config();
const client = require("../../config/db");
const {
  contactEmail,
  resetPasswordEmail,
  formMessage,
} = require("../../utils/nodemailer");

const userController = {
  async login(req, res) {
    //fetch le user depuis la db basé sur l'email passé en paramètre
    try {
      const { email, password } = req.body;
      const user = await client.query(
        `SELECT "user".id, "user".pseudo, "user".email, "user".password, "user".birthdate, "user".pronoun, "user".firstname, "user".lastname, "user".postal_code, "user".description, "user".picture_id, "user".role_id, "user".created_at, "user".updated_at,
        picture.name as picture_name, picture.slug as picture_slug
        FROM "user"
        JOIN picture ON picture.id = "user".picture_id
        WHERE email = $1`, [
        email,
      ]);

      if (user.rows.length === 0) {
        return res.status(401).json({ error: "L'email est incorrect" });
      }

      //check que le mot de passe du user est correct

      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].password
      );

      if (!validPassword) {
        return res.status(401).json("Mot de passe incorrect");
      }

      let tokens = jwtTokens(user.rows[0]);

      res.json({
        user: user.rows[0],
        tokens,
      });
    } catch (err) {
      debug(err);
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

      let newTokens = jwtTokens(newUser.rows[0]);
      if (!newUser) {
        return res.status(404).json({
          status: "L'utilisateur·ice n'a pas pu être ajouté·e",
        });
      }
      // A verifier avec le front
      //if (!req.body.email)
      //return res.status(204).json({ error: "Email obligatoire" });
      res.json({
        newTokens,
        newUser: newUser.rows[0].id,
      });
    } catch (err) {
      debug(err);
      res.status(500).render(err.toString());
    }
  },

  async getUserProfil(req, res) {
    try {
      const getUserProfil = await userDataMapper.getUserProfil(req.params.id);
      if (!getUserProfil) {
        return res.status(404).json({
          status: "Nous n'avons trouvé aucun profil d'utilisateur·ice.",
        });
      }
      return res.json(getUserProfil);
    } catch (err) {
      debug(err);
      res.status(500).json(err.toString());
    }
  },

  async delete(req, res) {
    try {
      const deleteUser = await userDataMapper.delete(req.params.id);
      if (!deleteUser) {
        return res.status(404).json({
          status: "utilisateur·ice n'a pas pu être supprimé·e",
        });
      }
      return res.json(deleteUser);
    } catch (err) {
      debug(err);
      res.status(500).json(err.toString());
    }
  },

  async resetPassword(req, res) {
    try {
      const { email } = req.body;

      const user = await client.query('SELECT * FROM "user" WHERE email = $1', [
        email,
      ]);

      if (!user)
        return res.status(404).json({
          status: "Nous n'avons trouvé aucun·e utilisateur·ice avec cet email.",
        });

      let newTokens = jwtTokens(user.rows[0]);

      contactEmail.sendMail(
        resetPasswordEmail(email, newTokens.accessToken),
        (error) => {
          if (error) {
            res.json({
              status:
                "Désolé le service est inactif pour le moment. Merci de ressayer dans quelques minutes.",
            });
          } else {
            res.json({
              status:
                "Un email contenant les instructions pour réinitialiser votre mot de passe vous a été envoyé.",
            });
          }
        }
      );
    } catch (err) {
      debug(err);
      res.status(500).json(err.toString());
    }
  },

  async setNewPassword(req, res) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const decode = authorizationMiddleware(req.headers.authorization);
      const result = await client.query(
        'UPDATE "user" SET password = $2 WHERE email = $1',
        [decode.email, hashedPassword]
      );
      if (!result) {
        res
          .status(304)
          .json({ message: "Votre mot de passe n'a pas pu être modifié." });
      }
    } catch (error) {
      debug(error);
      res.status(500).json(err.toString());
    }
  },

  async getAllUsers(_, res) {
    try {
      const users = await userDataMapper.getAllUsers();
      if (!users) {
        return res.status(404).json({
          status: "Nous n'avons trouvé aucun profil d'utilisateur·ice.",
        });
      }
      return res.json(users);
    } catch (err) {
      debug(err);
      res.status(500).json(err.toString());
    }
  },

  async edit(req, res) {
    try {
      const savedUser = await userDataMapper.edit(req.params.id, req.body);
      if (!savedUser) {
        res
          .status(404)
          .json({ message: "Votre utilisateur·ice n'a pas été modifié·e." });
      }
      const  password  = req.body;
      //check que le mot de passe du user est correct

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!validPassword) {
      return res.status(401).json("Mot de passe incorrect");
    }

    let tokens = jwtTokens(user.rows[0]);
    if (!savedUser) {
      return {
        status: "L'utilisateur·ice n'a pas pu être modifié·e",
      };
    }
      return res.json({
        user : savedUser,
        token : tokens
      });
    } catch (err) {
      debug(err);
      res.status(500).json(err.toString());
    }
  },

  async contactForm(req, res) {
    try {
      contactEmail.sendMail(formMessage(req.body), (error) => {
        if (error) {
          res.json({
            status:
              "Désolé le service est inactif pour le moment. Merci de ressayer dans quelques minutes.",
          });
        } else {
          res.json({
            status:
              "Merci. Votre message a bien été envoyé, nous vous répondrons dans les plus brefs délais.",
          });
        }
      });
    } catch (err) {
      debug(err);
      res.status(500).json(err.toString());
    }
  },

  async getAllAvatars(req, res) {
    try {
      const avatars = await userDataMapper.getAllAvatars();
      if (!avatars) return res.status(404).json({message: "Pas d'avatars disponibles."})
      res.status(200).json(avatars)
    } catch (err) {
      debug(err);
    }
  },
};

module.exports = userController;
