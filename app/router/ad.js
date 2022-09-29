const express = require("express");
const adController = require("../controller/api/adController");

const router = express.Router();


router.get("/api/annonces",adController.getAll);
router.get("/api/annonces/category/:category_id",adController.getAllByCategory);


module.exports = router;

