const express = require("express");
const app = express();
const block = require("./api/block");

app.use("/block", block);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
