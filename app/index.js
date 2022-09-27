const express = require('express');
const app = express();




/** ********* */
/*  EXPRESS */
/** ******** */

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const routerIndex = require("./router");
app.use(routerIndex);

module.exports = app;












