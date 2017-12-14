var requestMain = require("request");
var fs = require("fs");
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
var request = {};
request.get = function(url, fn) {
  var today = new Date().getDate();
  var fName = "horoscope/data/" + encodeURIComponent(url) + "__" + today;
  var filePresent = fs.existsSync(fName);
  if (filePresent) {
    var resp = fs.readFileSync(fName).toString();
    console.log("Cache...");
    return fn(null, null, resp);
  }
  console.log("Actual...");
  return requestMain.get(url, fn);
};

function cache(url, resp) {
  var today = new Date().getDate();
  var fName = "horoscope/data/" + encodeURIComponent(url) + "__" + today;
  fs.writeFileSync(fName, resp);
}

function getToday(sign, cb) {
  sign = sign.toLowerCase();
  var index = signs.indexOf(sign) + 1;
  if (index < 1) {
    cb({ result: "Invalid Sign" });
    return;
  }
  var url = "http://astrology.dinakaran.com/teamajax.asp?cat=" + index;
  request.get(url, function(err, httpRes, body) {
    cache(url, body);
    var pattern = {
      head: "/>(.*)</h2",
      desc: "p>(.*)</p"
    };
    // console.log(body);
    var dt = new Date();
    var result = utils.regexParser(pattern, body);
    result.date =
      dt.getDate() + "." + (dt.getMonth() + 1) + "." + dt.getUTCFullYear();
    cb(result);
  });
}

function getWeek(sign, cb) {
  sign = sign.toLowerCase();
  var index = signs.indexOf(sign) + 1;
  if (index < 1) {
    cb({ result: "Invalid Sign" });
    return;
  }
  var url =
    "http://astrology.dinakaran.com/weeklypalandetail.asp?aid=5&rid=" + index;
  request.get(url, function(err, httpRes, body) {
    cache(url, body);
    var pattern = {
      head: 'main-rasibalan"><h1><a href="#">(.*?)</a',
      desc: 'img"/>(.*)<br><br><',
      date: 'main-rasibalan"><h1><a href="#">.*</a></h1>(.*?)<p'
    };
    // console.log(body);
    var result = utils.regexParser(pattern, body);
    result.desc = result.desc.replace(/&nbsp;/g, " ");
    // result.date = new Date();
    cb(result);
  });
}

function getMonth(sign, cb) {
  sign = sign.toLowerCase();
  var index = signs.indexOf(sign) + 1;
  if (index < 1) {
    cb({ result: "Invalid Sign" });
    return;
  }
  var url =
    "http://astrology.dinakaran.com/tamilmathapalandetail.asp?aid=5&rid=" +
    index;
  request.get(url, function(err, httpRes, body) {
    cache(url, body);
    var pattern = {
      head: 'main-rasibalan"><h1><a href="#">(.*?)</a',
      desc: 'img"/>(.*?)<br><br><',
      date: 'main-rasibalan"><h1><a href="#">.*</a></h1>(.*?)<p'
    };
    // console.log(body);
    var result = utils.regexParser(pattern, body);
    result.desc = result.desc.replace(/&nbsp;/g, " ");
    result.desc = result.desc.replace(/<br>/g, "\n");
    // result.date = new Date();
    cb(result);
  });
}
// getMonth("aries",console.log);

module.exports = {
  getToday,
  getWeek,
  getMonth
};
