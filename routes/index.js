var express = require('express');
var router = express.Router();

var db = require('../db/queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '' });
});

router.get('/meals', db.getAllMeals);
router.get('/meals/:id', db.getOneMeal);
router.post('/meals', db.createMeal);
router.put('/meals/:id', db.updateMeal);
router.delete('/meals/:id', db.deleteMeal); 

module.exports = router;