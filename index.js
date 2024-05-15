const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const bodyParser = require("body-parser");

const routes = require("./routes/router");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use("/", routes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
