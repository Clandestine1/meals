let pgp = require('pg-promise')();
let connString = process.env.DATABASE_URL;
let db = pgp(connString);

function getAllMeals(req, res, next) {
  db.any('select * from meals')
    .then(function(data) {
      console.log('DATA:', data);
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'All Meals Retrieved '
        });
    })
    .catch(function(err) {
      return next(err);
    });
}


function getOneMeal(req, res, next) {
  let taskID = parseInt(req.params.id);
  db.one('select * from meals where id = $1', taskID)
    .then(function(data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'One Meal Was Retrieved'
        });
    })
    .catch(function(err) {
      return next(err);
    });
}


function createMeal(req, res, next) {
  req.body.age = parseInt(req.body.age);
  console.log('req.body ===>', req.body)
  db.none('insert into meals(item, minutes)' +
      'values(${item}, ${minutes})',
      req.body)
    .then(function() {
      res.status(200)
        .json({
          status: 'success',
          message: 'One Meal Inserted'
        });
    })
    .catch(function(err) {
      return next(err);
    });
}

function updateMeal(req, res, next) {
  db.none('update meals set item=$1, minutes=$2 where id=$3', [req.body.item, parseInt(req.body.minutes), parseInt(req.params.id)
    ])
    .then(function() {
      res.status(200)
        .json({
          status: 'success',
          message: 'Meal Updated'
        });
    })
    .catch(function(err) {
      return next(err);
    });
}


function deleteMeal(req, res, next) {
  let taskID = parseInt(req.params.id);
  db.result('delete from meals where id = $1', taskID)
    .then(function(result) {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} task`
        });
    })
    .catch(function(err) {
      return next(err);
    });
}

//CRUD
module.exports = {
  createMeal: createMeal, //CREATE
  getAllMeals: getAllMeals, //READ
  getOneMeal: getOneMeal,   //READ
  updateMeal: updateMeal,   //UPDATE
  deleteMeal: deleteMeal    //DELETE
};