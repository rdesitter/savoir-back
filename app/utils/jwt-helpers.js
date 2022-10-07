const jwt = require("jsonwebtoken");

function jwtTokens(userObject) {
  const user = { ...userObject }; 
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1200s' });
  //const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '5m' });
  return ({ accessToken, /*refreshToken*/ });
}

function authorizationMiddleware(token) {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}

module.exports = {jwtTokens, authorizationMiddleware};