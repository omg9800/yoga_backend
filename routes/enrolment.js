const express = require("express");
const router = express.Router();

const enrolment = require("../controllers/enrolment");
const {verifyToken} =require('../middlewares/authJwt')

router.get("/",[verifyToken], enrolment.getAllEnrolment);
router.get("/:userId",[verifyToken], enrolment.getEnrolmentsByUserId);
router.post("/get_cur_month_enrol",[verifyToken], enrolment.getEnrolmentForCurrentMonth);

router.post("/", enrolment.addEnrolment);

module.exports = router;