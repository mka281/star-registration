const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const block = require("./api/block");
const chain = require("./api/chain");
const signature = require("./api/signature");

// use body-parser
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: false })); // to support URL-encoded bodies

// use api routes
app.use("/block", block);
app.use("/chain", chain);
app.use("/signature", signature);

// define validationRequests object and pass it to countdown helper
app.locals.validationRequests = {};
let { validationRequests } = app.locals;
require("./helpers/countdown")(validationRequests);

// keep validated addresses in this object
app.locals.validatedAddresses = {};

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
