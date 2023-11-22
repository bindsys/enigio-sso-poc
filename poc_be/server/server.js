/*
 **************************************************************************************************
 * IBind Systems Private Limited
 *
 * © IBind Systems Private Limited. 2023 All Rights Reserved
 *
 * Users Restricted Rights - Use, duplication, distribution, disclosure are strictly prohibited
 * by IBind Systems Private Limited.
 **************************************************************************************************
 */

/* eslint-disable no-unused-vars */
// import dependencies and initialize express
const config = require('./utils/config');
const express = require('express');
const bodyParser = require('body-parser');
const Routes = require("./routes");
const cors = require('cors');

const app = express();
app.use(cors());

// enable parsing of http request body
app.use(bodyParser.json({limit: '20mb'}));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '20mb',
    parameterLimit: 20000,
  }),
);
app.use(Routes);
app.get(`${config.API_BASE}/health`, (_, res) => {
  res.status(200).send({
    statusCode: 200,
    success: true,
    message: 'Server is up!',
    status: 'UP',
  });
});

// routes and api calls
module.exports = app;
