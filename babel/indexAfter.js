"use strict";

var _express = _interopRequireDefault(require("express"));

var _constant = _interopRequireDefault(require("./constant/constant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PORT = process.env.PORT || 3000;
var app = (0, _express["default"])();
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use(_express["default"].json());
app.get("/", function (req, res) {
  res.send("Hello Babel. My Name is ".concat(_constant["default"].NAME));
});
app.listen(PORT, function () {
  console.log("Connected ".concat(PORT, " port"));
});
