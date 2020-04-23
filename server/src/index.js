const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '../../out')));
app.set('views', path.join(__dirname, '../../out'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.render('index.html');
});

app.listen('3001');
