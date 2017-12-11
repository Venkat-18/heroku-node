var request = require("request");
var utils = require("../utils.js");
var signs = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces"
];
function getToday(sign, cb) {
  sign = sign.toLowerCase();
  var index = signs.indexOf(sign) + 1;
  if (index < 1) {
    cb({ result: "Invalid Sign" });
    return;
  }
  request.get(
    "http://astrology.dinakaran.com/teamajax.asp?cat=" + index,
    function(err, httpRes, body) {
      var pattern = {
        head: "/>(.*)</h2",
        desc: "p>(.*)</p"
      };
      // console.log(body);
      var result = utils.regexParser(pattern, body);
      result.date = new Date();
      cb(result);
    }
  );
}

function getWeek(sign, cb) {
  sign = sign.toLowerCase();
  var index = signs.indexOf(sign) + 1;
  if (index < 1) {
    cb({ result: "Invalid Sign" });
    return;
  }
  request.get(
    "http://astrology.dinakaran.com/weeklypalandetail.asp?aid=5&rid=" + index,
    function(err, httpRes, body) {
      var pattern = {
        head: 'main-rasibalan"><h1><a href="#">(.*?)</a',
        desc: 'img"/>(.*)<br><br><',
        date: 'main-rasibalan"><h1><a href="#">.*</a></h1>(.*?)<p'
      };
      // console.log(body);
      var result = utils.regexParser(pattern, body);
      // result.date = new Date();
      cb(result);
    }
  );
}

function getMonth(sign, cb) {
  sign = sign.toLowerCase();
  var index = signs.indexOf(sign) + 1;
  if (index < 1) {
    cb({ result: "Invalid Sign" });
    return;
  }
  request.get(
    "http://astrology.dinakaran.com/tamilmathapalandetail.asp?aid=5&rid=" + index,
    function(err, httpRes, body) {
      var pattern = {
        head: 'main-rasibalan"><h1><a href="#">(.*?)</a',
        desc: 'img"/>(.*)<br><br><',
        date: 'main-rasibalan"><h1><a href="#">.*</a></h1>(.*?)<p'
      };
      // console.log(body);
      var result = utils.regexParser(pattern, body);
      // result.date = new Date();
      cb(result);
    }
  );
}
// getMonth("aries",console.log);

module.exports = {
  getToday,
  getWeek,
  getMonth
};
