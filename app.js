const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

//controllers
const { globalErrorHandler } = require('./controllers/errorController');

//routes
const { usersRouter } = require('./routes/usersRoutes');
const { repairsRouter } = require('./routes/repairsRouters');

//init express app
const app = express();

// Enable CORS
app.use(cors());

// Enable incoming JSON data
app.use(express.json());

//app security headers
app.use(helmet());

//compress responses
app.use(compression());

//Log incomming request
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(morgan('combined'));

// Limit IP requests
const limiter = rateLimit({
  max: 10000,
  windowMs: 3 * 60 * 60 * 1000,
  message: 'Too many requests from this IP',
});

app.use(limiter);

//endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/repairs', repairsRouter);

// global Error Handler
app.use('*', globalErrorHandler);

module.exports = { app };
