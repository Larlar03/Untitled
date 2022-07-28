import express from "express";
import mysql from "mysql";

const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  database: "care",
  user: "root",
  password: "root",
});

app.get("/", (req, res) => {
  res.send("Hello JavaScript");
});

app.get("/salons", function getSweet(req, res) {
  connection.query("SELECT * FROM salons", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
