//THIS IS WHERE I ENDED at 12:30

var express = require('express');
var router = express.Router();
var connectionString = 'postgres://localhost:5432/code_challenge';

//going to need a PUT, after it is complete then the animals.js route should run
// with the newly updated information so when it is appended it is different each time

//PUT will have an UPDATE query for SQL that will update the quantity of animals
//after the randomNumber function has been called.

router.put('/', function(req, res) {
    var animal = //req.body or req.params
        var randomNumber = function(min, max) {
            return Math.floor(Math.random() * (1 + max - min) + min);
        };

    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            res.sendStatus(500);
        }

        client.query('UPDATE animals ' +
            'SET quantity =' + randomNumber(1, 100), [animal.quantity],
            function(err, result) {
                done();

                if (err) {
                    console.log('err', err)
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }

            });
    });
});


module.exports = router;
