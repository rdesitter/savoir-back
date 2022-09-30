const express = require("express");
const userController = require("../controller/api/userController");

const router = express.Router();

router.get("/",  function message(req, res) {
    res.send("Hello World");
  });

router.post("/api/register", userController.register);
router.post("/api/login", userController.login);
router.delete("/api/user/:id",userController.delete)
router.patch("/api/users/:id",userController.edit)
module.exports = router;
