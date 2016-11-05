const axios = require('axios');
const config = require('./sg-weather-config');
const headerConfig = {
  headers: {
    "api-key": config.apiToken()
  }
};

/** Helper Functions **/
var getDateName = (date) => {
  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var dateNow = new Date(Date.parse(date));
  return days[dateNow.getDay()];
};
var getFullTime = (time) => {
  return new Date(Date.parse(time)).toLocaleTimeString();
};
var capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
var getTodayForecast = () => {
  return axios.get(config.reqUrl(), headerConfig);
};
var get4DaysForecast = () => {
  return axios.get(config.req4DayUrl(), headerConfig);
};
/** Helper Functions **/

var GetForecast = (callback) => {
  axios.all([getTodayForecast(), get4DaysForecast()])
    .then(axios.spread(function(day, days) {
      var result = day.data.items[0];
      var results = days.data.items[0];

      var forecasts = [];
      result.general.timestamp = "Today";
      result.general.regions = result.periods[0].regions;
      forecasts.push(result.general);
      results.forecasts.forEach((val, idx, array) => {
        val.timestamp = getDateName(val.timestamp);
        delete val.date;
        forecasts.push(val);
      });

      callback({
        "statusCode": "200",
        "statusMessage": "Success",
        "forecasts": forecasts
      });

    })).catch((e) => {
      var resStatus = e.response.status;

      if (resStatus === 401) {
        message = "Missing request token.";
      } else if (resStatus === 400) {
        message = `Bad request, please check your query. Response Message: ${e.response.data.message}`;
      } else {
        message = JSON.stringify(e, undefined, 4);
      }

      callback({
        "statusCode": e.response.status,
        "statusMessage": message,
        "forecasts": {}
      });

    });
}

module.exports = {
  GetForecast
}
