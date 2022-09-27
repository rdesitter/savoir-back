const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { Client } = require("pg");
const client = require("../../config/db");

// async function getAllUser() {
//   await client.connect()
//   const res = await client.query('SELECT * FROM "user"')

//   console.log(res.rows[0]);

//   //await client.end()
// }

// getAllUser()

const userController = {
  async login(req, res) {
    await client.connect();

    function generateAccessToken(user) {
      return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1800s",
      });
    }

    // TODO: fetch le user depuis la db basé sur l'email passé en paramètre

    //  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await client.query('SELECT * FROM "user" WHERE email = $1', [
      email,
    ]);
    //console.log(user);
    if (user.rows.length === 0)
      return res.status(401).json({ error: "Email is incorrect" });

    // TODO: check que le mot de passe du user est correct

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    console.log("######", validPassword);
    if (!validPassword) {
      return res.status(401).json("Incorrect password");
    }

    //  catch (err) {
    //   console.error(err.message);
    //    res.status(500).send("Server error");
    // }

    const accessToken = generateAccessToken(user);
    console.log(accessToken);
    res.send({
      accessToken,
    });
  },

  async register(req, res) {
    await client.connect();
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await client.query(
      'INSERT INTO "user" (email,password, pseudo ,birthdate, role_id) VALUES ($1,$2,$3,$4,$5) RETURNING *'
      , [req.body.email, hashedPassword, req.body.pseudo, req.body.birthdate, req.body.role_id]);
    //res.json(jwtTokens(newUser.rows[0]));
    res.send("ok")
  },
};

module.exports = userController;
