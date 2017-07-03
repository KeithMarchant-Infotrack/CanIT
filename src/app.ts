import * as express from 'express';
import * as bodyParser from 'body-parser';
import mongoose = require('mongoose');
import * as expressHandlebars from 'express-handlebars';
import candidateController from './controllers/candidate.controller';

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

app.use(bodyParser());

// Register controllers

app.use('/candidates', candidateController);

// Health check endpoint

app.get('/healthcheck', (req, res) => {
    res.send('I\'m alive!');
});

// Run the application

app.listen(port, () => console.log(`CanIT is running on port ${port}.`));
