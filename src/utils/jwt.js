const jwt = require("jsonwebtoken");

function CreateJWT(value, key) {
  const token = jwt.sign(value, key, { expiresIn: "2h" });
  return token;
}

function VerifyJWT(token, key) {
  const decoded = jwt.verify(token, key);

  return decoded;
}

module.exports = { CreateJWT, VerifyJWT };
