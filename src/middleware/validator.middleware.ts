import * as express from 'express';
import CandidateModel from '../models/candidate.model';
import RequestModel from '../models/request.model';
import * as RequestHelper from '../helpers/request.helper';

export default async function(req: express.Request, res: express.Response, next: () => void) {
    const token = RequestHelper.getBearerToken(req);

    if (!token) {
        res.status(401).send();
        return;
    }

    const candidate = await CandidateModel.findOne({ token });

    if (!candidate) {
        res.status(401).send();
        return;
    }

    await RequestModel.create({
        candidate: candidate.id,
        headers: req.headers,
        method: req.method,
        body: req.body,
        timestamp: new Date(),
        url: req.protocol + '://' + req.get('host') + req.originalUrl
    });

    next();
}
