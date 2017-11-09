'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var express = _interopRequireWildcard(_express);

var _bodyParser = require('body-parser');

var bodyParser = _interopRequireWildcard(_bodyParser);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var app = express();
var localPort = 8080;

app.set('port', process.env.PORT || localPort);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});

exports.default = app;
//# sourceMappingURL=Express.js.map