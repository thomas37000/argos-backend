const express = require("express");
const equipages = require("./equipages");
const connection = require('./config/config');
const PORT = 8080;
const app = express();

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Express server listening on ${PORT}`);
  }
});

app.get("/equipages", (req, res) => {
  res.status(200).json(equipages);
});

app.get("/equipages/:id", (req, res) => {
  // find itérateur pour stocker directement
  const equipage = equipages.find(
    (equipage) => equipage.id === parseInt(req.params.id)
  );
  console.log(equipage);

  if (equipage !== undefined) {
    res.status(200).json(equipage);
  } else {
    res.status(404).json("this Argonaut don't exist");
  }
});

app.get("/", (req, res) => {
  connection.query(
    "SELECT * from equipage ORDER BY nom ASC",
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      } else if (results.length < 1) {
        res.status(404).send("il n 'y a pas d' équipages ici !");
      } else {
        res.status(200).json(results);
      }
    }
  );
});

app.get("/argonaute/:id", (req, res) => {
  connection.query(
    "SELECT * FROM equipage WHERE idEquipage = ?",
    [req.params.id],
    (err, results) => {
      if (err) {
        res.status(500).json(err);
      } else if (results.length < 1) {
        res.status(404).send("Argonaute inconnu(e)!");
      } else {
        res.status(200).json(results[0]);
      }
    }
  );
});
