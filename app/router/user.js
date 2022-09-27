const express = require('express');
const userController = require("../controller/api/userController");


const router = express.Router();


router.post("/api/login",userController.login);
router.post("/api/register", userController.register)

module.exports = router;