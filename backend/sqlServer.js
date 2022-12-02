// Express
import express from "express";
const app = express();
app.use(express.json());

// MySQL
import mysql from "mysql";

// Cors
import cors from "cors";
app.use(cors());

import mockSalon from "./mock-salon-data";

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

// Get all salons
app.get("/salons", (req, res) => {
    db.query("SELECT id, name, post_code FROM salons", (err, results) => {
        if (err) {
            console.log(err.response.data);
        } else {
            res.send(results);
        }
    });
});

// app.get('/salons/:city', (req, res) => {
//   db.query(
//     'SELECT * \
//     FROM location \
//     WHERE city = ?',
//     [req.params.city],
//     (err, results) => {
//       if (err) {
//         console.log(err.response.data);
//       } else {
//         res.send(results);
//       }
//       db.end;
//     }
//   );
// });

//  Get all salons from city
app.get("/salons/:city", (req, res) => {
    db.query(
        "SELECT * \
        FROM salons \
        WHERE city_id IN ( \
        SELECT id \
	      FROM location \
	      WHERE city = ?)",
        [req.params.city],
        (err, results) => {
            if (err) {
                console.log(err.response.data);
            } else {
                res.send(results.rows);
            }
            db.end;
        }
    );
});

// // Get all locations
// app.get("/location", (req, res) => {
//   db.query("SELECT * FROM location", (err, results) => {
//     if (err) {
//       console.log(err.response.data);
//     } else {
//       res.send(results);
//     }
//   });
// });

// // Get all locations that match city param
// app.get("/location/:city", (req, res) => {
//   db.query(
//     "SELECT * FROM location WHERE city = ?",
//     [req.params.city],
//     (err, results) => {
//       if (err) {
//         console.log(err.response.data);
//       } else {
//         res.send(results);
//       }
//     }
//   );
// });

// //  Get all salons from city
// app.get("/salons/:city", (req, res) => {
//   db.query(
//     "SELECT * FROM \
//     salons s \
//     INNER JOIN \
//     location l \
//     ON s.city_id = l.id \
//     WHERE l.city = ?",
//     [req.params.city],
//     (err, results) => {
//       if (err) {
//         console.log(err.response.data);
//       } else {
//         res.send(results);
//       }
//     }
//   );
// });

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
