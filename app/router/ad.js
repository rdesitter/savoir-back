const express = require("express");
const adController = require("../controller/api/adController");

const router = express.Router();


router.get("/api/annonces",adController.getAll);


module.exports = router;

