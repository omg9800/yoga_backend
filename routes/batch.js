const express = require("express");
const router = express.Router();

const batch = require("../controllers/batch");

router.get("/", batch.getAllBatch);
router.get("/:id", batch.addBatch);
router.post("/", batch.addBatch);

module.exports = router;