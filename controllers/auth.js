const db = require("../models");
const User = db.users;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require('dotenv').config()

const secretKey=process.env.SECRET_KEY


module.exports.login=async(req,res)=>{

  try {
  
    let user = await User.findOne({where:{ email: req.body.email }});
    if (!user) return res.status(400).send("Invalid email or password.");
  
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Invalid email or password.");
  
    console.log(secretKey);
    const token = jwt.sign({ id: user.id }, secretKey, {
      expiresIn: 86400, 
    });
  
    res.send({"token":token,"user":user});

  } catch (e) {
    res.status(400).send({"success":false ,"message":e})
  }
}
