// Import Express
import express from 'express';
const app = express();
app.use(express.json());

// Import postgres
import pkg from 'pg';
const { Client } = pkg;

// Cors
import cors from 'cors';
app.use(cors());

// Port
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// const connectionString='postgressql://username:password@localhost:5432/databasename'
// const connectionString = "postgressql://lana.gordon:root@localhost:5432/care";
// const client = new Client({
//   connectionString: connectionString,
// });

const db = new Client({
  host: 'localhost', // server name or IP address;
  port: 5432,
  database: 'care',
  user: 'lana.gordon',
  password: 'root',
});

db.connect();

app.get('/', (req, res) => {
  res.send('Care DB');
});

// Get all salons
app.get('/salons', (req, res) => {
  db.query('SELECT id, name, post_code FROM salons', (err, results) => {
    if (err) {
      console.log(err.response.data);
    } else {
      res.send(results.rows);
    }
    db.end;
  });
});

//  Get all salons from city
app.get('/salons/city', (req, res) => {
  db.query(
    'SELECT * \
    FROM salons \
    WHERE city_id IN ( \
      SELECT id \
	    FROM location \
	    WHERE city = ?)',
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
//       res.send(results.rows);
//           db.end;
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
