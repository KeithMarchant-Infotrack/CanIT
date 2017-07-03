import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import candidateController from './controllers/candidate.controller';
import authController from './controllers/authentication.controller';

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

// TODO AMW this doesn't look like the right way to include a router, but i can't get it working the other way dammit
var ac = require('./controllers/authentication.controller.js');
app.use('/register/:userName/:email', ac.register);

// Health check endpoint

app.get('/healthcheck', (req, res) => {
    res.send('I\'m alive!');
});

// Run the application

app.listen(port, () => console.log(`CanIT is running on port ${port}.`));
