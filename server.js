require("dotenv").config();
const app = require("./app");
const debug = require('debug')('app:Debug');
const port = process.env.PORT;



app.listen(port, () => {
  debug(`Example app listening on port ${port}`);
});

