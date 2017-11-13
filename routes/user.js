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
  models.Page.findAll({
    where: {authorId: userid},
    attributes: ["title", 'urlTitle']
  })
  .then((result) => res.render('index', {pages: result}))
  .catch(console.log);
});

module.exports = userRouter;
