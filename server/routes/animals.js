var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/code_challenge';

console.log(connectionString);


router.get('/', function(req, res) {
    pg.connect(connectionString, function(err, client, done) {
        console.log('You connected to the zoo database so...');

        if (err) {
            console.log('it at least got to here');
            res.sendStatus(500);
        }

        client.query('SELECT * FROM animals', function(err, result) {
            done();

            if (err) {
                res.sendStatus(500);
            }

            res.send(result.rows);
        });
    });
});

router.post('/', function(req, res) {
    var animal = req.body;
    console.log(animal);

    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            res.sendStatus(500);
        }

        client.query('INSERT INTO animals (description)' +
            'VALUES ($1)', [animal.animalType],
            function(err, result) {
                done();

                if (err) {
                    res.sendStatus(500);
                }
                console.log(animal);
                res.sendStatus(201);
            });
    });

});









module.exports = router;
