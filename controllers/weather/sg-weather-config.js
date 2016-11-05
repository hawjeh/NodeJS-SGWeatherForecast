const token = "";
const url = "https://api.data.gov.sg/v1/environment/24-hour-weather-forecast";
const daysUrl = "https://api.data.gov.sg/v1/environment/4-day-weather-forecast";


var apiToken = () => {
  return token;
}

var reqUrl = () => {
  return url;
}

var req4DayUrl = () => {
  return daysUrl;
}

module.exports = {
  apiToken,
  reqUrl,
  req4DayUrl
}
