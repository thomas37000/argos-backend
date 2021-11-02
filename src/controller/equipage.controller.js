const express = require('express');
const connection = require('../../config/config');

const router = express.Router();

router.get('/', (req, res) => {
  connection.query('SELECT * from equipage ORDER BY nom ASC', (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else if (results.length < 1) {
      res.status(404).send("il n 'y a pas d' équipages ici !");
    } else {
      res.status(200).json(results);
    }
  });
});

router.get('/argonaute/:id', (req, res) => {
  connection.query(
    'SELECT * FROM equipage WHERE idEquipage = ?',
    [req.params.id],
    (err, results) => {
      if (err) {
        res.status(500).json(err);
      } else if (results.length < 1) {
        res.status(404).send('Argonaute inconnu(e)!');
      } else {
        res.status(200).json(results[0]);
      }
    }
  );
});

module.exports = router;