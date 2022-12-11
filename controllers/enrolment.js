const db=require('../models/index')
const Enrolment=db.enrolments;

module.exports.getAllEnrolment = (req, res) => {
    Enrolment.findAll()
    .then((enrolments) => {
      res.json({"success":true,"enrolments":enrolments});
    })
    .catch((err) => {console.log(err); return res.status(400).send({"success":false,"message":err})});
};

module.exports.getEnrolmentsByUserId = (req, res) => {
  const id = req.params.userId;

  Enrolment.findAll({
    where:{
      userId:id
    }
  })
    .then((enrolments) => {
      res.json({"success":true,"enrolments":enrolments});
    })
    .catch((err) => {console.log(err); return res.status(400).send({"success":false,"message":err})});
};

module.exports.getEnrolmentForCurrentMonth= (req, res) => {
  const id = req.body.userId;
  const date=req.body.date

  Enrolment.findAll({
    where:{
      userId:id,
      enroledMonth:date
    }
  })
    .then((enrolments) => {
      res.json({"success":true,"enrolments":enrolments});
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

  