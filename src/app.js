const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const userRoutes = require('./routes/user/user.routes');
const vehicleRoutes = require('./routes/vehicles/vehicle.routes');
const { errorHandler } = require('./shared/middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/v1/vehicles', vehicleRoutes);
app.use(errorHandler);


module.exports = app;

