const express = require("express");
const router = express.Router();

const user = require("../controllers/user");

router.get("/", user.getAllUser);
router.get("/:id", user.getUser);
router.post("/", user.addUser);

module.exports = router;