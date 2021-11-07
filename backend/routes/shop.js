const mysql = require("mysql");
const config = require("../config/db");
const router = require("express").Router();
const db = mysql.createPool(config.mysql);

router.get("/get-shops", (req, res) => {
  var query = `SELECT * from shop`;
  db.query(query, [1], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.message);
    }
    console.log(result);
    return res.status(200).send(result);
  });
});

router.post("/get-my-shops", (req, res) => {
  const { id } = req.body;
  var query = `SELECT * from shop where shopowner_ID = ${id}`;
  db.query(query, [1], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.message);
    }
    console.log(result);
    return res.status(200).send(result);
  });
});

router.post("/register-shop", (req, res) => {
  const { name, category, shopowner_id, shop_img } = req.body;
  var date = new Date();
  const shop_id = parseInt(String(date.getTime()).substr(6, 8));
  var query = `INSERT INTO shop (shop_ID, shopowner_ID, name, category, image) VALUES (${shop_id}, ${shopowner_id}, "${name}", "${category}", "${shop_img}");`;
  db.query(query, [1], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.message);
    }
    return res.status(200).send(result);
  });
});

module.exports = router;
