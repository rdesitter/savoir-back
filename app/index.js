const express = require("express");
const cors = require("cors");
const app = express();

/** ********* */
/*  EXPRESS */
/** ******** */
const corsOptions = { credentials: true, origin: "*" };
const routerIndex = require("./router");
const { authorizationError } = require("./middlewares/authorizationError");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(routerIndex);

app.use('/apidoc', express.static('apidoc'));
app.use(authorizationError);


module.exports = app;
