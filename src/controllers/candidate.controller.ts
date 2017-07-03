import * as express from 'express';
import candidateModel from '../models/candidate.model';

const controller = express.Router();

controller.post('/', async (req, res) => {
    const newCandidate = await candidateModel.create(req.body);

    res.status(200).json(newCandidate);
});

controller.get('/new', (req, res) => {
    res.render('candidate/new');
});

export default controller;
