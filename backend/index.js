const express = require("express");
const app = express();
const config = require("./config/db");
const cors = require("cors");
const createTables = require("./config/tables");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello World!"));
const routes = ["user", "shop", "product"];

createTables();

routes.forEach((route) => app.use(`/${route}`, require(`./routes/${route}`)));

const port = config.port;
app.listen(port, () => {
  console.log(`Running on Port ${port}`);
});
