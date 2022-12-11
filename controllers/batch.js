const db=require('../models/index')
const Batch=db.batches;
const {validate,CompletePayment}=require('../utils/utils')


module.exports.getAllBatch = (req, res) => {
  Batch.findAll()
    .then((batches) => {
      res.json({"success":true,"batches":batches});
    })
    .catch((err) => {
      res.status(400).send({"success":false, "message":e})
    });
};

module.exports.getBatch = (req, res) => {
  const id = req.params.id;

  Batch.findOne({
    where:{
      id:id
    }
  })
    .then((batch) => {
      res.json(batch);
    })
    .catch((err) => res.send(err));
};


  module.exports.addBatch = async(req,res) => {

    try {
      const {startTime,endTime,strengths,fee}=req.body;
      let response = { success: true, message: "Batch Added" };
 
      
      if (!startTime) {
        response.success = false;
        response.message = "Start Time is not valid";
      }
      if (!endTime) {
        response.success = false;
        response.message = "End Time is not valid";
      }

      const batch=await Batch.create({startTime,endTime,strengths,fee});
      return res.status(200).send({"success":true,"batch":batch,"message":"Batch created!"})
     

    } catch (e) {
      return res.status(400).send({"success":false,"message":e})
    }
  
  }

  