var main = require("./main.js");
function Horoscope(app) {
  app.get("/horoscope/today/:sign", function(req, res) {
    function callback(data) {
      res.json(data);
    }
    main.getToday(req.params.sign, callback);
  });
  app.get("/horoscope/week/:sign", function(req, res) {
    function callback(data) {
      res.json(data);
    }
    main.getWeak(req.params.sign, callback);
  });
}

module.exports = Horoscope;
