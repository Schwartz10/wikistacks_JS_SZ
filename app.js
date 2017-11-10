const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');

const app = express();
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.listen(3000, () => {
  console.log('killing it on port 3000');
});
