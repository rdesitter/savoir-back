const express = require("express");
const userController = require("../controller/api/userController");

const router = express.Router();



router.get("/api/user/:id", userController.getUserProfil);

router.post("/api/register", userController.register);
router.post("/api/login", userController.login);

router.delete("/api/user/:id",userController.delete);

router.patch("/api/newpassword", userController.setNewPassword);
router.post("/api/resetpassword", userController.resetPassword);
router.post("/api/contact", userController.contactForm);

router.patch("/api/user/:id",userController.edit)


router.get("/api/avatar", userController.getAllAvatars);

module.exports = router;
