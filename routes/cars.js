var express = require('express');
var router = express.Router();
const models = require('../models/index')

/* GET all cars . */
router.get('/', function (req, res, next) {
    models.cars.findAll().then((cars) => {
        res.send(cars)
    })
});

// get single car
router.get('/:id', function (req, res, next) {
    models.cars.findByPk(req.params.id).then((car) => {
        res.send(car)
    })
});


// Create car
router.post('/', (req, res) => {

    const car = models.cars.build({
        make: req.body.make,
        model: req.body.model,
        still_owned: req.body.still_owned,
        userId: req.body.userId
    })

    car.save().then((car) => {
        res.send("car saved")
    }).catch ((err) => {
        res.send(err)
    })
})

// Delete car
router.delete(('/:id'), (req, res) => {
    models.users.destroy({
        where: {
            id: req.params.id
        }
    }).then((data) => {
        res.send(`Car with id: ${req.params.id} removed`)
    })
})


module.exports = router;
