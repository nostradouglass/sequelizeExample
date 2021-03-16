const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const Sequelize = require('sequelize')
const config = require('./config/config.json')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const carsRouter = require('./routes/cars')

const app = express();

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: "postgres"
  });

 

  async function connectToDb() {
    try {
        await sequelize.authenticate();
        sequelize.sync({force: true})
        console.log('Connection to DB has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }

  connectToDb();
 

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cars', carsRouter);

module.exports = app;
