const express = require('express');
const userController = require("../controller/api/userController");


const router = express.Router();


router.post("/api/register", userController.register)
router.get("/api/login", userController.message)
router.post("/api/login",userController.login);

module.exports = router;