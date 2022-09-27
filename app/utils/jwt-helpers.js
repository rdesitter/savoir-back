const jwt = require("jsonwebtoken");

function jwtTokens({ email,password, pseudo ,birthdate, role_id }) {
    const user = { email,password, pseudo ,birthdate, role_id}; 
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1200s' });
    //const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '5m' });
    return ({ accessToken, /*refreshToken*/ });
  }

  module.exports = jwtTokens;