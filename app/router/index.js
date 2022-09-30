const express = require('express');
const userRouter = require("./user");
const adRouter = require("./ad");
const categoryRouter = require("./category");

const router = express.Router();

router.use(userRouter, adRouter, categoryRouter);

module.exports = router;



