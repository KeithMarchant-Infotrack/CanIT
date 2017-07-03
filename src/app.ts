import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import bookingController from './controllers/booking.controller';
import candidateController from './controllers/candidate.controller';
import roomController from './controllers/room.controller';

const app = express();
const port = 3000;
const config = require('./config.json');

// Establish database connection

mongoose.connect(config.connectionString);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.on('open', () => console.log('connection successful'));

// Register middleware modules

app.use(bodyParser());

// Register controllers

app.use('/candidates', candidateController);
app.use('/rooms', roomController);
app.use('/bookings', bookingController);

// Health check endpoint

app.get('/healthcheck', (req, res) => {
    res.send('I\'m alive!');
});

// Run the application

app.listen(port, () => console.log(`CanIT is running on port ${port}.`));
