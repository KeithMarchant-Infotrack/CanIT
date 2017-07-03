import * as express from 'express';
import candidateModel from '../models/candidate.model';
import { Mailer } from '../helpers/mailer.helper';
import * as multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const controller = express.Router();

controller.post('/', async (req, res) => {
    const candidate = await candidateModel.create({ email: req.body.email });

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
    const candidate = await candidateModel.findById(req.params.userId);

    if (!candidate) {
        res.status(404);
        return;
    }

    res.render('candidate/me', candidate);
});

controller.post('/:userId/upload', upload.single(), async (req, res) => {
    const candidate = await candidateModel.findByIdAndUpdate(req.params.userId, { file: req.file.path }, { new: true });

    if (!candidate) {
        res.status(404);
        return;
    }

    res.status(200).json(candidate);
});

controller.get('/:userId/manage', async (req, res) => {
    const candidate = await candidateModel.findById(req.params.userId);

    if (!candidate) {
        res.status(404);
        return;
    }

    res.render('candidate/manage', candidate);
});

export default controller;
