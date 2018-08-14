const express = require("express");
const app = express();

const block = require("./api/block");
const chain = require("./api/chain");

app.use("/block", block);
app.use("/chain", chain);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
