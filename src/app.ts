import * as express from 'express';
import * as bodyParser from 'body-parser';
import bookingController from './controllers/booking.controller';
import * as expressHandlebars from 'express-handlebars';
import bookingController from './controllers/booking.controller';
import candidateController from './controllers/candidate.controller';
import roomController from './controllers/room.controller';
import authController from './controllers/authentication.controller';
import roomController from './controllers/room.controller';
import mongoose = require('mongoose');

const app = express();
const port = 3000;
const config = require('../config.json');

// Configure views

app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Configure static content

app.use(express.static('public'));

// Establish database connection

mongoose.connect(config.connectionString);
mongoose.Promise = Promise;
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.on('open', () => console.log('connection successful'));

// Register middleware modules

app.use(bodyParser.json());

// Register controllers

app.use('/candidates', candidateController);
app.use('/rooms', roomController);
app.use('/bookings', bookingController);



// Generic endpoints

app.get('/healthcheck', (req, res) => {
    res.send('I\'m alive!');
});

app.get('/', (req, res) => {
    res.redirect('/candidates');
});

// Run the application

app.listen(port, () => console.log(`CanIT is running on port ${port}.`));
