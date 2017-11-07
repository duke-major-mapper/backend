// @flow

import mysql from 'mysql';
import {config} from './config';

const options = {
  user: config['MYSQL_USER'],
  password: config['MYSQL_PASSWORD'],
  database: config['DATABASE'],
  socketPath: `/cloudsql/${config['INSTANCE_CONNECTION_NAME']}`
};

export const connection = mysql.createConnection(options);
