const express = require('express');
//const adRouter = require("./adController");
//const categoryRouter = require("./categoryController");
const userRouter = require("./user");
const adRouter = require("./ad");
const router = express.Router();

router.use(userRouter, adRouter);



module.exports = router;


