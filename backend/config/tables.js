const { query } = require("express");
const mysql = require("mysql");
const config = require("./db");
var db = mysql.createPool(config.mysql);

var userTable = `CREATE TABLE IF NOT EXISTS user
(
    user_ID int PRIMARY KEY AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    contact_no varchar(20),
    role varchar(255) NOT NULL
);`;

var customerTable = `CREATE TABLE IF NOT EXISTS customer
(
    customer_ID int PRIMARY KEY AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    contact_no varchar(20)
);`;

var shopownerTable = `CREATE TABLE IF NOT EXISTS shopowner
(
    shopowner_ID int PRIMARY KEY AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    contact_no varchar(20),
    shop_number int
);`;

var userCustomerTable = `CREATE TABLE IF NOT EXISTS user_customer
(
    user_ID int,
    customer_ID int,
    PRIMARY KEY(user_ID, customer_ID),
    FOREIGN KEY(user_ID) REFERENCES user(user_ID),
    FOREIGN KEY(customer_ID) REFERENCES customer(customer_ID)
);`;

var userShopownerTable = `CREATE TABLE IF NOT EXISTS user_shopowner
(
    user_ID int,
    shopowner_ID int,
    PRIMARY KEY(user_ID, shopowner_ID),
    FOREIGN KEY(user_ID) REFERENCES user(user_ID),
    FOREIGN KEY(shopowner_ID) REFERENCES shopowner(shopowner_ID)
);`;

var shopTable = `CREATE TABLE IF NOT EXISTS shop
(
    shop_ID int,
    shopowner_ID int,
    PRIMARY KEY(shop_ID, shopowner_ID),
    name varchar(255) NOT NULL,
    category varchar(255) NOT NULL,
    image varchar(64000),
    product_number int,
    FOREIGN KEY(shopowner_ID) REFERENCES shopowner(shopowner_ID)
);`;

var productTable = `CREATE TABLE IF NOT EXISTS product
(
    product_ID int PRIMARY KEY,
    name varchar(255) NOT NULL,
    section varchar(255) NOT NULL,
    price int NOT NULL,
    quantity int NOT NULL,
    image varchar(64000)
);`;

var cartTable = `CREATE TABLE IF NOT EXISTS cart
(
    cart_ID int PRIMARY KEY,
    customer_ID int,
    product_number int NOT NULL,
    total_cost int NOT NULL,
    total_quantity int NOT NULL,
    FOREIGN KEY(customer_ID) REFERENCES customer(customer_ID)
);`;

var productCartTable = `CREATE TABLE IF NOT EXISTS product_cart
(
    product_ID int,
    cart_ID int,
    PRIMARY KEY(product_ID, cart_ID),
    FOREIGN KEY(product_ID) REFERENCES product(product_ID),
    FOREIGN KEY(cart_ID) REFERENCES cart(cart_ID)
);`;

var buysTable = `CREATE TABLE IF NOT EXISTS buys
(
    customer_ID int,
    product_ID int,
    PRIMARY KEY(customer_ID, product_ID),
    FOREIGN KEY(product_ID) REFERENCES product(product_ID),
    FOREIGN KEY(customer_ID) REFERENCES customer(customer_ID)
);`;

var comprisesTable = `CREATE TABLE IF NOT EXISTS comprises
(
    shop_ID int,
    product_ID int,
    PRIMARY KEY(shop_ID, product_ID),
    FOREIGN KEY(shop_ID) REFERENCES shop(shop_ID),
    FOREIGN KEY(product_ID) REFERENCES product(product_ID)
);`;

var tables = [
  userTable,
  customerTable,
  shopownerTable,
  userCustomerTable,
  userShopownerTable,
  shopTable,
  productTable,
  cartTable,
  buysTable,
  comprisesTable,
  productCartTable,
];

const createTables = () => {
  try {
    tables.map((query) => {
      db.query(query, (err, result) => {
        if (err) {
          console.log(err.message);
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = createTables;
