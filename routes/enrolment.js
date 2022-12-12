const express = require("express");
const router = express.Router();

const enrolment = require("../controllers/enrolment");
const {verifyToken} =require('../middlewares/authJwt')
router.get("/", enrolment.getAllEnrolment);
router.get("/:userId", enrolment.getEnrolmentsByUserId);
router.post("/get_cur_month_enrol", enrolment.getEnrolmentForCurrentMonth);

router.post("/", enrolment.addEnrolment);

module.exports = router;