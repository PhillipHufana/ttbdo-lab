import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "lacticacidlab",
});

export default db;
