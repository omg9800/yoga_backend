const moment=require('moment')
const db=require('../models/index')
const Enrolment=db.enrolments;
const Batch=db.batches
const User=db.users
const {CompletePayment}=require('../utils/utils')

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

module.exports.getEnrolmentForCurrentMonth= async(req, res) => {

  try {

    const id = req.body.userId;
    const date=moment(new Date).format('YYYY-MM')+"-01"

    let enrolment=await Enrolment.findOne({
      where:{
        userId:id,
        enroledMonth:date
      }
    })
    let batch=await Batch.findOne({
      where:{
        id:enrolment.batchId}
    })
    res.json({"success":true,"enrolment":enrolment,"batch":batch});


  } catch (e) {
    return res.status(400).send({"success":false,"message":e})
  }

};


  module.exports.addEnrolment = async(req,res) => {

    try {
      const {batchId,userId}=req.body;
      let response={'status':201,'messgae':"Enroled!"}

      let enroledMonth=moment(new Date()).format('YYYY-MM')+"-01"

      let exist=await Enrolment.findOne({where:{enroledMonth,userId}})
      if(exist) return res.status(400).send({"success":false,"message":"User already registered for this month!"})
      

      let Payres=await CompletePayment(1);
      if(Payres["success"]==false)
      return res.status(400).send(Payres)
      
      const enrolment=await Enrolment.create({userId,batchId,enroledMonth})
      response["enrolment"]=enrolment
      return res.status(200).send(response)
     
    } catch (e) {
      return res.status(400).send({"success":false,"message":e})
    }

  }

  