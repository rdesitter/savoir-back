const express = require("express");
const userController = require("../controller/api/userController");

const router = express.Router();

router.get("/",  function message(req, res) {
    res.send("Hello World");
  });

router.get("/api/user/:id", userController.getUserProfil);

router.post("/api/register", userController.register);
router.post("/api/login", userController.login);

router.delete("/api/user/:id",userController.delete);
router.post("/user/resetpassword", userController.resetPassword);
router.post("/api/newpassword", userController.setNewPassword);

router.patch("/api/user/:id",userController.edit)

router.post("/api/contact", userController.contactForm);

module.exports = router;
