var express = require('express');
var router = express.Router();
var pg = require('pg');
var connection = require('../modules/connection.js');
var rand = require('../modules/randomNumber');

router.post('/', function(req, res) {
  var animal = req.body;
  var pop = rand(1, 100);
  console.log(pop);

  pg.connect(connection, function(err, client, done) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("INSERT INTO animals (animal_type, population) VALUES ($1, $2) RETURNING id",
        [animal.animalType, pop],
        function (err, result) {
          done();
          if(err) {
            console.log(err);
            res.sendStatus(500);
          }

          res.sendStatus(201);
        }
      )}
    );
});

router.get('/', function(req, res) {
  pg.connect(connection, function(err, client, done) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT * FROM animals ORDER BY id ASC", function(err, result) {
      done();
      if(err) {
        console.log(err);
        res.sendStatus(500);
      }

      res.send(result.rows);
    });
  });
});


module.exports = router;
