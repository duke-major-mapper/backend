// @flow

import {connection} from './cloudsql';

console.log(connection.state);

// connection.query('CREATE TABLE TEST (id int);', function (err, result) {
//     if (err) throw err;
//     console.log("Result: " + result);
// });
