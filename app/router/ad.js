const express = require("express");
const adController = require("../controller/api/adController");
const router = express.Router();

// as a visitor
router.get("/api/annonces",adController.getAll);
router.get("/api/annonces/category/:category_id",adController.getAllByCategory);
router.get("/api/annonces/user/:user_id",adController.getAllByUser);
router.get("/api/annonces/type/:type_id",adController.getAllByType) /* ajout /type */
router.get("/api/annonces/:id",adController.getOneWithSimilar)

// as a user
router.get("/api/users/annonces/:user_id", adController.getUserAds)
router.post("/api/users/create-annonces",adController.createUserAd);

module.exports = router;

