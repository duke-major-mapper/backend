// @flow

import mysql from 'mysql';
import fs from 'fs';
import type {SQLCredentials} from './types';

const credentials : SQLCredentials = 
    JSON.parse(fs.readFileSync('./src/shared/config.json', 'utf8'));
export var connection = initDatabase(credentials);

function initDatabase(credentials: SQLCredentials) {
    var con = mysql.createConnection({
        host: credentials.host,
        user: credentials.user,
        password: credentials.password
    });

    return con;
}
