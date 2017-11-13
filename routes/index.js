const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const wikiRouter = require('./wiki')

router.use('/user', userRouter);
router.use('/wiki', wikiRouter);
//BRAINSTORMING FOR GETTER FUNCTIONS
// router.get('/wiki/:urlTitle', function(req, res){
//   let urlTitle = req.params.urlTitle;


// })

module.exports = router;
