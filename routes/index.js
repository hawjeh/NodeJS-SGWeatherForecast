'use strict';

const weather = require('../controllers/weather/sg-weather');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.redirect('/weather');
  });

  app.get('/weather', (req, res) => {
    weather.GetForecast((obj) => {
      res.render('pages/weather', {
        pageTitle: 'SG Weather Forecast',
        weatherObj: obj
      });
    });
  });

  app.get('*', function(req, res) {
    res.status(404).send("Page not found.");
  });
};
