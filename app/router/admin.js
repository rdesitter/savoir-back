const express = require("express");
const userController = require("../controller/api/userController");
const router = express.Router();

router.get("/api/admin/users", userController.getAllUsers);

module.exports = router;

