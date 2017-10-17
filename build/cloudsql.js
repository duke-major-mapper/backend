'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connection = undefined;

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = {
  user: _config.config['MYSQL_USER'],
  password: _config.config['MYSQL_PASSWORD'],
  database: _config.config['DATABASE'],
  socketPath: '/cloudsql/' + _config.config['INSTANCE_CONNECTION_NAME']
};

var connection = exports.connection = _mysql2.default.createConnection(options);
//# sourceMappingURL=cloudsql.js.map
