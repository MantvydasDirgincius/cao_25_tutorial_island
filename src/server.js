const express = require('express');
const { PORT } = require('./config');
const app = express();

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.listen(PORT, () => console.log(`pakurta ant ${PORT}`));
