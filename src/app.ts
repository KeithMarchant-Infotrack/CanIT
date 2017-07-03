import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as expressHandlebars from 'express-handlebars';
import candidateController from './controllers/candidate.controller';
import authController from './controllers/authentication.controller';
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

// TODO AMW this doesn't look like the right way to include a router, but i can't get it working the other way dammit
const ac = require('./controllers/authentication.controller.js');
app.use('/register/:userName/:email', ac.register);

// Generic endpoints

app.get('/healthcheck', (req, res) => {
    res.send('I\'m alive!');
});

app.get('/', (req, res) => {
    res.redirect('/candidates');
});

// Run the application

app.listen(port, () => console.log(`CanIT is running on port ${port}.`));
