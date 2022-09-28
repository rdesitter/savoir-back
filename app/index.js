const express = require('express');
const cors = require('cors');
const app = express();


/** ********* */
/*  EXPRESS */
/** ******** */
const corsOptions = {credentials:true, origin: process.env.URL || '*'};
const routerIndex = require("./router");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(routerIndex);

module.exports = app;












