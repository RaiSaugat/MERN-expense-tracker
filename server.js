const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const expensesRoutes = require('./routes/expenses-routes');
const usersRoutes = require('./routes/users-routes');

const app = express();

app.use(express.json()); //get data in req.body in controller

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // controls which domain have access
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE'); //this handles incoming request
  next();
});

app.use('/api/v1/expenses', expensesRoutes);
app.use('/api/v1/users', usersRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500).json({
    success: false,
    message: error.message || 'An unknown error occurred!',
  });
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
