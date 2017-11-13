const express = require('express');
const wikiRouter = express.Router();
const models = require('../models');
let db = models.db;
let Page = models.Page;
let User = models.User;

wikiRouter.get('/', (req, res, next) => {
  res.redirect('/');
});

wikiRouter.get('/add', (req, res, next) => {
  res.render('addpage');
});

wikiRouter.get('/:urlTitle', (req, res, next) => {
  let urlTitle = req.params.urlTitle;
  Page.findOne({ //finds one row versus findAll finds all rows
    where: {urlTitle: urlTitle}
  })
  .then((data) => {
    res.render('wikipage', data.dataValues);
  })
  .catch(console.log);
  //res.send(req.method + req.path);
}
);

wikiRouter.post('/', (req, res, next) => {
  let data = req.body;

  //Could check the length of the array of keys to make sure the user filled out everything.
  User.findOne({where: {name: data.user_name}})
  .then((result) => {
    if (!result) {
      return User.create({
        name: data.user_name,
        email: data.user_email
      });
    } else return result;
  })
  .then((resultingUser) => {
    return Page.create({
      title: data.page_title,
      content: data.page_content,
      status: data.page_status,
      authorId: resultingUser.dataValues.id
    });
  })
  .then((newPageData) => res.redirect(newPageData.route))
  .catch(console.log);
});


module.exports = wikiRouter;
