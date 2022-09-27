const express = require('express');
//const adRouter = require("./adController");
//const categoryRouter = require("./categoryController");
const userRouter = require("./user");
const router = express.Router();

router.use(userRouter);



module.exports = router;


