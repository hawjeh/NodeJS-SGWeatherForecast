'use strict';

const express = require('express');
const routes = require('./routes/index.js');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

app.use('/public', express.static(process.cwd() + '/public'));

// Logging
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// No Cache
app.use((req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next()
});

// Maintenance
// app.use((req, res, next) => {
//   res.render('misc/maintenance');
// });

app.set('view engine', 'ejs');

// Setup routes
routes(app);

// Server Start
app.listen(port, () => {
  console.log(`Server listening to port ${port}`);
});
