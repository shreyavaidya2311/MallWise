const mysql = require("mysql");
const config = require("../config/db");
const router = require("express").Router();
const db = mysql.createPool(config.mysql);

router.post("/checkout", (req, res) => {
  const {
    cart_ID,
    customer_ID,
    product_number,
    total_cost,
    total_quantity,
    products,
  } = req.body;
  var query = `INSERT INTO cart (cart_ID, customer_ID, product_number, total_cost, total_quantity) VALUES (${cart_ID}, ${customer_ID}, ${product_number}, ${total_cost}, ${total_quantity});`;
  let arr = [1];
  let i = 1;
  products.map((product) => {
    i += 1;
    arr.push();
    query += `INSERT INTO buys (customer_ID, product_ID) VALUES (${customer_ID}, ${product.id});`;
    i += 1;
    arr.push();
    query += `INSERT INTO product_cart (product_ID, cart_ID, quantity) VALUES (${product.id}, ${cart_ID}, ${product.quantity});`;
    i += 1;
    arr.push();
    query += `UPDATE product SET quantity = ${product.rquantity} WHERE product_ID = ${product.id}`;
  });
  db.query(query, arr, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.message);
    }
    return res.status(200).send(result);
  });
});

module.exports = router;
