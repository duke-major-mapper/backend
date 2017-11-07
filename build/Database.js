'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = initDatabase;

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var credentials = JSON.parse(_fs2.default.readFileSync('../config.json', 'utf8'));
initDatabase(credentials);
console.log();

function initDatabase(credentials) {
    var con = _mysql2.default.createConnection({
        host: credentials.host,
        user: credentials.user,
        password: credentials.password
    });

    return con;
}
//# sourceMappingURL=Database.js.map
