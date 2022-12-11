const jwt = require("jsonwebtoken");
require('dotenv').config()

verifyToken = (req, res, next) => {
  const header = req.headers["authorization"];
  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1]

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.status(401).send({"success":false,"message":"Forbidden"});
      req.user = user;
      next();
    });

  } else {
    res.status(403).send({"success":false,"message":"Forbidden"})
  }
};




const authJwt = {
  verifyToken
};
module.exports = authJwt;