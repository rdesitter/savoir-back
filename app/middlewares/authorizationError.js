const authorizationError = function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    console.log('<< 401 UNAUTHORIZED - Invalid Token');
    res.status(401).send('Invalid token');
  }
}

module.exports = { authorizationError };