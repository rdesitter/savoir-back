const express = require("express");
const categoryController = require("../controller/api/categoryController");
const router = express.Router();



router.get("/api/categories",categoryController.getAll);

router.patch("/api/categories/:id",categoryController.edit)
router.delete("/api/categories/:id",categoryController.delete)
// route pour créer une category en admin (benoit)






module.exports = router;

