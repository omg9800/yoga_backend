const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const cors=require('cors');
const { sequelize } = require("./models");
const user=require('./routes/user');
const batch=require('./routes/batch');
const enrolment=require('./routes/enrolment');
const auth=require('./routes/auth');
require('dotenv').config()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())


require('./config/connection')

 sequelize.authenticate().then(()=>{
    console.log("Connected...");
 }).catch(e=>console.log(e))

 sequelize.sync({ alter: true });
//  const Batch=db.batches
//  Batch.sync({ force: true })

 app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/users',user);
app.use('/batches',batch);
app.use('/enrolments',enrolment);
app.use('/signin',auth);

const port=process.env.PORT || 6400

//Create Server
app.listen(port, (err) => {
    if (err)
        console.log(err);
    else
        console.log("Server is running at port %d:", 6400);
});