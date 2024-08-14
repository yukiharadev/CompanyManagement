const express = require('express');
const helmet = require('helmet');
const cors = require('cors');   
const morgan = require('morgan');
const {swaggerUi, specs} = require('./swagger');
const path = require('path');
const app = express();

//init middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

//init database
require('./dbs/init.mongodb');

//init routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));



app.use("", require('./router'));

//Handle Errors
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    const statusCodes = error.status || 500;
  
    return res.status(statusCodes).json({
      error: {
        status: "error",
        code: statusCodes,
        message: error.message || "Internal Server Error",
      },
    });
  });

  
  module.exports = app;
  