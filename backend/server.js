// Express
import express from "express";
const app = express();
app.use(express.json());

// MySQL
import mysql from "mysql";

// Cors
import cors from "cors";
app.use(cors());

// Port
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

const db = mysql.createConnection({
  host: "localhost",
  database: "care",
  user: "root",
  password: "root",
});

app.get("/", (req, res) => {
  res.send("Care DB");
});

app.get("/salons", (req, res) => {
  db.query("SELECT id, name, post_code FROM salons", (err, results) => {
    if (err) {
      console.log(err.response.data);
    } else {
      res.send(results);
    }
  });
});

app.get("/location", (req, res) => {
  db.query("SELECT * FROM location", (err, results) => {
    if (err) {
      console.log(err.response.data);
    } else {
      res.send(results);
    }
  });
});

app.get("/location/:city", (req, res) => {
  db.query(
    "SELECT * FROM location WHERE city = ?",
    [req.params.city],
    (err, results) => {
      if (err) {
        console.log(err.response.data);
      } else {
        res.send(results);
      }
    }
  );
});

// app.get("/location", (req, res) => {
//   const city = req.body.city;
//   console.log(city);
//   db.query("SELECT * FROM location WHERE city = ?", [city], (err, results) => {
//     if (err) {
//       console.log(err.response.data);
//     } else {
//       res.send(results);
//     }
//   });
// });

// app.get("/location", (req, res) => {
//   db.query("SELECT * FROM location", (err, results) => {
//     if (err) {
//       console.log(err.response.data);
//     } else {
//       res.send(results);
//     }
//   });
// });

// app.get("/salons/:id", function getSalon(req, res, next) {
//   const salonId = req.params.id;
//   connection.query(
//     "SELECT * FROM salons WHERE id = ?",
//     [salonId],
//     (err, results) => {
//       if (err) throw err;
//       res.json(results);
//     }
//   );
// });
