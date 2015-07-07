// Stream Object
module.exports = function () {
  this.body = [];
  this.last = ""

  this.prototype.add = function (str) {
    var result = str;
    if (str.search(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i)) {
      result = '<a href="' + result.toLowerCase() + '">' + str + '</a>'
    }

    this.body.push(result);
    this.last = result;
    return result;
  };
}
