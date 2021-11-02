const express = require("express");
const app = express();
const config = require("./config/db");
const cors = require("cors");
const createTables = require("./config/tables");

app.use(cors());

app.get("/", (req, res) => res.send("Hello World!"));

createTables();

const port = config.port;
app.listen(port, () => {
  console.log(`Running on Port ${port}`);
});
