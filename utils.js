function regexParser(patternJson, content) {
  var result = {};
  var keys = Object.keys(patternJson);
  content = content.replace(/\n/g, "");
  content = content.replace(/\r/g, "");
  keys.map(function(i, j) {
    var reg = new RegExp(patternJson[i], "ig");
    // console.log(res, reg, patternJson, content);
    var res = reg.exec(content);
    // console.log(res,content);
    result[i] = res[1];
  });
  // console.log(result);
  return result;
}

module.exports = { regexParser };

// regexParser(json, content);
