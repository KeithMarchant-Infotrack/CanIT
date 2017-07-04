import * as express from 'express';
import CandidateModel from '../models/candidate.model';
import { Mailer } from '../helpers/mailer.helper';
import * as multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import RequestModel from '../models/request.model';

const destination = 'uploads';
const upload = multer({ dest: destination });

const controller = express.Router();

controller.post('/', async (req, res) => {
    const candidate = await CandidateModel.create({ email: req.body.email });

    const mailerOptions = {
        to: candidate.email,
        subject: 'Your InfoTrack CanIT link',
        text: 'http://localhost:3000/candidates/' + candidate.id
    };

    await Mailer.send(mailerOptions);

    res.status(200).json(candidate);
});

controller.get('/', (req, res) => {
    res.render('candidate/new', { js: '/build/js/candidate.js' });
});

controller.get('/:userId', async (req, res) => {
    const candidate = await CandidateModel.findById(req.params.userId);

    if (!candidate) {
        res.status(404);
        return;
    }

    res.render('candidate/me', candidate);
});

controller.post('/:userId/upload', upload.single('project'), async (req, res) => {
    const file = req.file.filename;
    const candidate = await CandidateModel.findByIdAndUpdate(req.params.userId, { file }, { new: true });

    if (!candidate) {
        res.status(404);
        return;
    }

    res.status(200).json(candidate);
});

controller.get('/:userId/manage', async (req, res) => {
    const candidate = await CandidateModel.findById(req.params.userId);

    if (!candidate) {
        res.status(404);
        return;
    }

    res.render('candidate/manage', candidate);
});

controller.get('/:userId/project', async (req, res) => {
    const candidate = await CandidateModel.findById(req.params.userId);

    if (!candidate) {
        res.status(404);
        return;
    }

    res.setHeader('Content-Type', 'application/zip');
    fs.createReadStream(path.join(destination, candidate.file)).pipe(res);
});

controller.get('/:userId/requests', async (req, res) => {
    const requests = await RequestModel.find({ candidate: req.params.userId });

    res.render('candidate/requests', { requests, css: '/css/candidate.css' });
});

export default controller;
