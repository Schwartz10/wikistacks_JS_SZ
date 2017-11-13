const express = require('express');
const userRouter = express.Router();
const models = require('../models');

userRouter.get('/', (req, res, next) => {
  models.User.findAll({
    attributes: ['id', 'name']
  })
  .then(result => {
    res.render('userpage', {users: result})
  })
  .catch(console.log);
 // res.render('', );
});

userRouter.get('/:userid', (req, res, next) => {
  let userid = req.params.userid;
  let userData = {};

  let promises =
  [
    models.User.findOne({
      where: {id: userid},
      attributes: ['name', 'email']
    })
    .then(result => userData.info = result),

    models.Page.findAll({
      where: {authorId: userid},
      attributes: ["title", 'urlTitle']
    })
    .then(result => userData.pages = result)
  ];

  Promise.all(promises)
  .then(() => console.log(userData))
  .then((result) => res.render('index', {pages: userData}))
  .catch(console.log);
});

module.exports = userRouter;
