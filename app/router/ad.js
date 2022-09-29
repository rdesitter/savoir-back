const express = require("express");
const adController = require("../controller/api/adController");

const router = express.Router();

// as a visitor
router.get("/api/annonces",adController.getAll);
router.get("/api/annonces/category/:category_id",adController.getAllByCategory);
router.get("/api/annonces/user/:user_id",adController.getAllByUser);

// as a user
// ! quelle est la différence avec la route api/annonces/user/:user_id
router.get("/api/users/annonces/:user_id", adController.getUserAds)

module.exports = router;

