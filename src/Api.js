// @flow

const extend = require('lodash').assign;
const mysql = require('mysql');
const config = require('./../config.json');
const app = require('./shared/Express');

const options = {
  user: config['MYSQL_USER'],
  password: config['MYSQL_PASSWORD']
};

const connection = mysql.createConnection(extend({
  multipleStatements: true
}, options));

const requestTemplate = {
  status: null,
  message: '',
  success: true,
  data: [],
};

if (config['INSTANCE_CONNECTION_NAME'] && config['NODE_ENV'] === 'production') {
  options.socketPath = `/cloudsql/${config['INSTANCE_CONNECTION_NAME']}`;
}

connection.query('USE major_data;');

app.get('/majors', function (req, res) {
  var requestObject = requestTemplate;
    connection.query(
        `SELECT * FROM Major;`, function (error, result) {
          if (error) {
            requestObject.status = 500;
            requestObject.success = false;
            requestObject.message = error;
            res.status(500).send(requestObject);
          } else {
            data = [''];
            for (var i = 0; i < result.length; i++) {
              data[result[i].id] = result[i].name
            }
            requestObject.status = 200;
            requestObject.data = data;
            requestObject.message = 'Major names recieved';
            res.status(200).send(requestObject);
          }
        }
    );
    // may need to json data
    console.log('GET ' + req.originalUrl);
});

app.get('/classes/:id', function (req, res) {
    const major_id = req.params.id;
    if (!major_id) {
        res.status(400).send("You did not supply the major id");
        console.log('FAILED: GET ' + req.originalUrl);
        return;
    }
    var requestObject = requestTemplate;
    connection.query(
        `SELECT * FROM Class JOIN
        ( SELECT * FROM Fulfills WHERE major_id = ${major_id}) AS Fulfills
        WHERE Class.id = Fulfills.class_id;`, function (error, result) {
              if (error) {
                requestObject.status = 500;
                requestObject.success = false;
                requestObject.message = (error.sqlMessage ? error.sqlMessage : error);
                res.status(500).send(requestObject);
              } else {
                requestObject.status = 200;
                requestObject.data = result;
                requestObject.message = 'Classes recieved';
                requestObject.id = major_id;
                res.status(200).send(requestObject);
              }
            }

    );
    // may need to json.parse(data)
    console.log('GET ' + req.originalUrl);
});

app.get('/requirements/:id', function (req, res) {
  const major_id = req.params.id;
  if (!major_id) {
      res.status(400).send("You did not supply the major id");
      console.log('FAILED: GET ' + req.originalUrl);
      return;
  }
  var requestObject = requestTemplate;
  connection.query(
    `SELECT * FROM Requirements WHERE major_id =` + major_id + `;`, function (error, result) {
      if (error) {
        requestObject.status = 500;
        requestObject.success = false;
        requestObject.message = (error.sqlMessage ? error.sqlMessage : error);
        res.status(500).send(requestObject);
      } else {
        requestObject.status = 200;
        requestObject.data = result;
        requestObject.message = 'Classes recieved';
        res.status(200).send(requestObject);
      }
    }
  );
  // may need to json.parse(data)
  console.log('GET ' + req.originalUrl);
});

app.get('/overlap', function (req, res) {
    let ids = req.query['ids'];
    if (!ids) {
        res.status(400).send("Please add a ids parameter");
        console.log('FAILED: GET ' + req.originalUrl);
        return;
    }
    ids = ids.split(',').map(Number);
    if (ids.length !== 2) {
        res.status(400).send("There needs to be ONLY 2 parameters for ids!");
        console.log('FAILED: GET ' + req.originalUrl);
        return;
    }
    var requestObject = requestTemplate;
    connection.query(
        `SELECT * FROM Class JOIN (
          SELECT f1.class_id, f1.major_id AS major1, f1.req_id AS req_id1, f2.major_id AS major2, f2.req_id AS req_id2
	        FROM Fulfills f1 JOIN Fulfills f2 ON (f1.major_id = ${ids[0]} AND f2.major_id = ${ids[1]} AND f1.class_id = f2.class_id)) Fulfills
          ON Class.id = Fulfills.class_id;`, function (error, result) {
            if (error) {
              requestObject.status = 500;
              requestObject.success = false;
              requestObject.message = (error.sqlMessage ? error.sqlMessage : error);
              res.status(500).send(requestObject);
            } else {
              requestObject.status = 200;
              requestObject.data = result;
              requestObject.message = 'Classes recieved';
              res.status(200).send(requestObject);
            }
          }
    );
    // may need to json.parse(data)
    console.log('GET ' + req.originalUrl);
});
