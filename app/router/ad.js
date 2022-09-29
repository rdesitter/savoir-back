const express = require("express");
const adController = require("../controller/api/adController");

const router = express.Router();


router.get("/api/annonces",adController.getAllAnnonces);


module.exports = router;

