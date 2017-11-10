const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const models = require('./models');
const chalk =  require('chalk');

const app = express();
let env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);


models.db.sync()
  .then(result => console.log('page is synced'))
  .then(() => app.listen(3000, () => console.log('killing it on port 3000')
  ))
  .catch(chalk.blue);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', express.static('public'));
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});
