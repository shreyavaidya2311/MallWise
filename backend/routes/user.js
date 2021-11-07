const mysql = require("mysql");
const config = require("../config/db");
const router = require("express").Router();
const db = mysql.createPool(config.mysql);

router.post("/register", (req, res) => {
  const { name, email, contactno, password, role } = req.body;
  var date = new Date();
  const user_id = parseInt(String(date.getTime()).substr(-4));
  const id = parseInt(String(date.getTime()).substr(4, 8));
  var query = `INSERT INTO user (user_ID, name, email, password, contact_no, role) VALUES (${user_id}, "${name}", "${email}", "${password}", ${contactno}, "${role}"); 
            INSERT INTO ${role} (${role}_ID, name, contact_no) VALUES (${id}, "${name}", ${contactno});
            INSERT INTO user_${role} (user_ID, ${role}_ID) VALUES (${user_id}, ${id});`;
  db.query(query, [1, 2, 3], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.message);
    }
    return res.status(200).send(result);
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  var query = `SELECT password, user_ID, role from user WHERE email = "${email}";`;
  db.query(query, [1], (err, result) => {
    fpassword = JSON.parse(JSON.stringify(result))[0].password;
    fuser_id = JSON.parse(JSON.stringify(result))[0].user_ID;
    frole = JSON.parse(JSON.stringify(result))[0].role;
    if (password == fpassword) {
      var nquery = `SELECT ${frole}_ID from user_${frole} WHERE user_ID = "${fuser_id}";`;
      db.query(nquery, [1], (err, results) => {
        if (frole == "customer") {
          id = JSON.parse(JSON.stringify(results))[0].customer_ID;
        } else {
          id = JSON.parse(JSON.stringify(results))[0].shopowner_ID;
        }
        if (err) {
          return res.status(400).send(err);
        }
        data = { user_ID: fuser_id, id: id };
        return res.status(200).send(data);
      });
    } else {
      return res.status(400).send("Passwords do not match");
    }
  });
});

module.exports = router;
