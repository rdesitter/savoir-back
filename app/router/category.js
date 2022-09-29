const express = require("express");
const categoryController = require("../controller/api/categoryController");

const router = express.Router();


router.get("/api/categories",categoryController.getAll);



module.exports = router;
