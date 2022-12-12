const bcrypt=require('bcryptjs')
const db=require('../models/index')
const User=db.users;



module.exports.getAllUser = (req, res) => {
  User.findAll({attributes: {exclude: ['password','createdAt','updatedAt']}})
    .then((users) => {
      res.json({"success":true,"users":users});
    })
    .catch((err) => res.status(400).send({"success":false,"message":err}));
};

module.exports.getUser = (req, res) => {
  const id = req.params.id;

  User.findOne({
    where:{
      id:id
    },
    attributes: {exclude: ['password','createdAt','updatedAt']}
  })
    .then((user) => {
      res.json({"success":true,"user":user});
    })
    .catch((err) => res.status(400).send({"success":false,"message":err}));
};


  module.exports.addUser = async(req,res) => {

    try {
      const {firstName,lastName,age,password,email,phone}=req.body;
      let exist=await User.findOne({where:{email:email},exclude:["password"]})
      if(exist) return res.status(400).send({"success":false ,"message":"User already exists!"})
      
      const user=await User.create({firstName,lastName,age,phone,email,password})
      console.log(user);
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();
    
      return res.status(200).send({"success":true,"user":{"id":user.id,"firstName":user.firstName,"lastName":user.lastName,"age":user.age,"phone":user.phone,"email":user.email},"message":"User added!"})
    } catch (err) {
      res.status(400).send({"success":false,"message":err});
    }
  }

  