const db=require('../models/index')
const Enrolment=db.enrolments;
const Batch=db.batches
const User=db.users

module.exports.getAllEnrolment = (req, res) => {

    User.findAll({include:{model:Batch, attributes:{exclude:["createdAt","updatedAt","enrolments"]}},attributes:{exclude:["password","createdAt","updatedAt"]}})
    .then((enrolments) => {
      res.json({"success":true,"enrolments":enrolments});
    })
    .catch((err) => {console.log(err); return res.status(400).send({"success":false,"message":err})});
};

module.exports.getEnrolmentsByUserId = (req, res) => {
  const id = req.params.userId;

  User.findAll({where:{id:id},include:{model:Batch, attributes:{exclude:["createdAt","updatedAt"]}},attributes:{exclude:["password","createdAt","updatedAt"]}})
    .then((enrolments) => {
      res.json({"success":true,"enrolments":enrolments});
    })
    .catch((err) => {console.log(err); return res.status(400).send({"success":false,"message":err})});
};

module.exports.getEnrolmentForCurrentMonth= (req, res) => {
  const id = req.body.userId;
  const date=req.body.date

  Enrolment.findOne({
    where:{
      userId:id,
      enroledMonth:date
    }
  })
    .then((enrolment) => {
      res.json({"success":true,"enrolment":enrolment});
    })
    .catch((err) => {console.log(err); return res.status(400).send({"success":false,"message":err})});
};


  module.exports.addEnrolment = async(req,res) => {

    try {
      const {batchId,userId,enroledMonth}=req.body;
      let response={'status':201,'messgae':"Enroled!"}

      let exist=await Enrolment.findOne({where:{enroledMonth}})
      if(exist) return res.status(400).send({"success":false,"message":"User already registered for this month!"})
      let enrolment=await Enrolment.create({userId,batchId,enroledMonth})
      response["enrolment"]=enrolment
      return res.status(200).send(response)
     
    } catch (e) {
      return res.status(400).send({"success":false,"message":e})
    }

  }

  