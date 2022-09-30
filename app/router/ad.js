const express = require("express");
const adController = require("../controller/api/adController");
const router = express.Router();


router.get("/api/annonces",adController.getAll);
router.get("/api/annonces/type/:type_id",adController.getAllByType) /* ajout /type */
router.get("/api/annonces/:id",adController.getOneWithSimilar)




module.exports = router;

