import * as express from 'express';
import candidateModel from '../models/candidate.model';

const candidateRouter = express.Router();

candidateRouter.post('/', async (req, res) => {
    const newCandidate = await candidateModel.create(req.body);

    res.status(200).json(newCandidate);
});

export default candidateRouter;
