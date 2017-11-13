const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const wikiRouter = require('./wiki');
const models = require('../models');

router.use('/users', userRouter);
router.use('/wiki', wikiRouter);
router.get('/', function(req, res){
  models.Page.findAll({attributes: ['title', 'urlTitle']})
  .then(pages => res.render('index', {pages: pages}))
  .catch(console.log);
});

module.exports = router;
