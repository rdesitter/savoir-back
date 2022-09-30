const userDataMapper = require("../../models/user");
const jwtTokens = require("../../utils/jwt-helpers");
const bcrypt = require("bcrypt");
require("dotenv").config();
const client = require("../../config/db");

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

 
};

module.exports = userController;
