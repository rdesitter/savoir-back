const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
require("dotenv").config();
const { Client } = require("pg");
const client = require("../../config/db")


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
      return jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1800s",
      });
    }

//     const user = {
//         id: 42,
//         name: 'Jean Bon',
//         email: 'jeanbon@gmail.com',
//         admin: true,
//     };
    // TODO: fetch le user depuis la db basé sur l'email passé en paramètre
     
     //try {
      const {email, password} = req.body;
      console.log(email, password)
      const user = await client.query('SELECT * FROM "user" WHERE email = $1', [email]);
      //console.log(user);
      if (user.rows.length === 0) return res.status(401).json({error:"Email is incorrect"})
      
      // TODO: check que le mot de passe du user est correct

      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].password
      );
        console.log("######",validPassword)
      if (!validPassword) {
        return res.status(401).json("Incorrect password");
      }
    //   const jwtToken = jwtGenerator(user.rows[0].id);
    //   return res.json({ jwtToken });
    // } catch (err) {
    //   console.error(err.message);
    //   res.status(500).send("Server error");
    // }
//     if (req.body.email !== 'jeanbon@gmail.com') {
//         res.status(401).send('invalid credentials');
//         return ;
//     }
//     if (req.body.password !== 'cuillere') {
//         res.status(401).send('invalid credentials');
//         return ;
//     }

     const accessToken = generateAccessToken(user);
     console.log(accessToken)
    res.send({
      accessToken,
    });
   },
 };

module.exports = userController;
