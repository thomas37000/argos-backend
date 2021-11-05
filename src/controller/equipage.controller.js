const express = require("express");
const connection = require("../../config/config");

const router = express.Router();

router.get("/argonautes", (req, res) => {
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

router.get("/argonaute/:id", (req, res) => {
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

router.post("/argonautes", (req, res) => {
  const { nom, genre, age } = req.body;
  connection.query(
    "INSERT INTO equipage (nom, genre, age) VALUES (?, ?, ?)",
    [nom, genre, age],
    (error) => {
      if (error) {
        console.log("test", error);
        res.status(500).json({ error: error });
      } else {
        // le status 200 ne passe pas
        // obliger de faire un log error pour que ça passe
        console.log("error on SUBMIT", error);
        
        // res.status(200).json({
        //   id: result.insertId,
        //   ...req.body,
        // });
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  const idclient = req.params.id;
  connection.query(
    "DELETE FROM equipage WHERE idEquipage = ?",
    [idclient],
    (err) => {
      if (err) {
        res.status(500).send("la suppression n' a pas marché !");
      } else {
        res
          .status(200)
          .send("l'argonaute a bien était supprimé et envoyé aux requins !");
      }
    }
  );
});

module.exports = router;
