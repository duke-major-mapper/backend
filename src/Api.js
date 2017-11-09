// @flow

const extend = require('lodash').assign;
const mysql = require('mysql');
const config = require('./../config.json');

const options = {
  user: config['MYSQL_USER'],
  password: config['MYSQL_PASSWORD']
};

if (config['INSTANCE_CONNECTION_NAME'] && config['NODE_ENV'] === 'production') {
  options.socketPath = `/cloudsql/${config['INSTANCE_CONNECTION_NAME']}`;
}

const connection = mysql.createConnection(options);

connection.query('USE DATABASE major_data;');

const app = require('./../Express');

app.get('/majors', function (req, res) {
    var data = connection.query(
        `SELECT name FROM Major;`,
        (err) => {
          if (err) {
            throw err;
          }
          console.log('Querying for all majors');
        }
    );
    // may need to json data
    res.status(200).send(data);
});

app.get('/classes', function (req, res) {
    const major_id = req.query['major_id'];
    
    if (!major_id) {
        res.status(400).send("You did not supply the major id");
    }
    
    var data = connection.query(
        `SELECT * FROM Class JOIN (
            Fulfills WHERE major_id =` + major_id + `) Fulfills
            WHERE Class.id = Fulfills.class_id;`, 
        (err) => {
          if (err) {
            throw err;
          }
          console.log('Querying classes for major ' + major_id);
        }
    );
    // may need to json.parse(data)
    res.status(200).send(data);
});

app.get('/requirements', function (req, res) {
    const major_id = req.query['major_id'];
    
    if (!major_id) {
        res.status(400).send("You did not supply the major id");
    }
    
    var data = connection.query(
        `SELECT * FROM Requirements WHERE major_id =` + major_id + `;`, 
        (err) => {
          if (err) {
            throw err;
          }
          console.log('Querying classes for major ' + major_id);
        }
    );
    // may need to json.parse(data)
    res.status(200).send(data);
});

app.get('/overlap', function (req, res) {
    const major_id_1 = req.query['major_id_1'];
    const major_id_2 = req.query['major_id_2'];
    
    if (!major_id_1 || !major_id_2) {
        res.status(400).send("You did not supply the major id(s)");
    }
    
    var data = connection.query(
        `SELECT * FROM Class JOIN (
            SELECT f1.class_id, f1.major_id AS major1, f1.req_id AS req_id1, f2.major_id AS major2, f2.req_id AS req_id2 
            FROM Fulfills f1 JOIN Fulfills f2 ON (f1.major_id = ` + major_id_1 +
            ` AND f2.major_id = ` + major_id_2 + ` AND f1.class_id = f2.class_id)
            ) Fulfills 
            WHERE Class.id = Fulfills.class_id;`, 
        (err) => {
          if (err) {
            throw err;
          }
          console.log('Querying overlapping classes for major ' + major_id_1 + 
          ' and major ' + major_id_2);
        }
    );
    // may need to json.parse(data)
    res.status(200).send(data);
});