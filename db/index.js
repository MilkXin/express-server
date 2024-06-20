const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin123",
  database: "my_db_01",
  insecureAuth: true,
});

connection.connect();

module.exports = connection;
