const mysql = require("mysql");
const config = require("../config/db");
const router = require("express").Router();
const db = mysql.createPool(config.mysql);

router.post("/add-product", (req, res) => {
  const { shop_id, name, section, price, quantity, image } = req.body;
  var date = new Date();
  const product_id = parseInt(String(date.getTime()).substr(-3));
  var query = `INSERT INTO product (product_ID, name, section, price, quantity, image) VALUES (${product_id}, "${name}", "${section}", ${price}, ${quantity}, "${image}"); 
              INSERT INTO comprises (shop_ID, product_ID) VALUES (${shop_id}, ${product_id});`;
  db.query(query, [1, 2], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.message);
    }
    return res.status(200).send(result);
  });
});

router.post("/get-products", (req, res) => {
  const { shop_id } = req.body;
  var query = `SELECT * from product WHERE product_ID IN (SELECT product_ID from comprises WHERE shop_ID = ${shop_id}); `;
  db.query(query, [1], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.message);
    }
    return res.status(200).send(result);
  });
});

router.post("/update-product", (req, res) => {
  const { product_id, name, quantity, price, section } = req.body;
  var query = `UPDATE product SET name = "${name}", quantity = ${quantity}, price = ${price}, section = "${section}" WHERE product_ID = ${product_id}; `;
  db.query(query, [1], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.message);
    }
    return res.status(200).send(result);
  });
});

router.post("/delete-product", (req, res) => {
  const { id } = req.body;
  var query = `DELETE from product where product_ID = ${id}`;
  db.query(query, [1], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.message);
    }
    return res.status(200).send(result);
  });
});

module.exports = router;
