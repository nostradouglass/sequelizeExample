var express = require('express');
var router = express.Router();
const models = require('../models/index')

/* GET all users . */
router.get('/', function (req, res, next) {
  models.users.findAll().then((users) => {
    res.send(users)
  })
});

// get single user
router.get('/:id', function (req, res, next) {
  models.users.findByPk(req.params.id).then((user) => {
    res.send(user)
  })
});


// Create user
router.post('/', (req, res) => {
  const user = models.users.build({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    hasCats: req.body.hasCats
  })

  user.save().then((user) => {
    res.send("user saved")
  })
})

// Delete user
router.delete(('/:id'), (req, res) => {
  models.users.destroy({
    where: {
      id: req.params.id
    }
  }).then((data) => {
    res.send(`User with id: ${req.params.id} removed`)
  })
})


module.exports = router;
