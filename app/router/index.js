const express = require('express');
//const adRouter = require("./adController");
//const categoryRouter = require("./categoryController");
const userRouter = require("./user");
const adRouter = require("./ad");
const categoryRouter = require("./category")
const router = express.Router();

router.use(userRouter, adRouter, categoryRouter);



module.exports = router;



