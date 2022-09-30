const express = require("express");
const categoryController = require("../controller/api/categoryController")
const router = express.Router();


//router.patch("/api/categories/:id",categoryController.editCategory)
router.delete("/api/categories/:id",categoryController.delete)



module.exports = router;