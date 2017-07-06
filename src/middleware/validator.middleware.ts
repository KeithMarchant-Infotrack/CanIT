import * as express from 'express';
import CandidateModel from '../models/candidate.model';
import TokenModel from '../models/token.model';
import RequestModel from '../models/request.model';
import * as RequestHelper from '../helpers/request.helper';

export default async function(req: express.Request, res: express.Response, next: () => void) {
    const token = RequestHelper.getBearerToken(req);

    if (!token) {
        res.status(401).send();
        return;
    }

    const tokenObj = await TokenModel.findOne({ value: token });

    if (!tokenObj) {
        res.status(401).send();
        return;
    }

    if( tokenObj.expires_at < new Date() ) {
        res.status(401).send();
        return;
    }

    await RequestModel.create({
        candidate: tokenObj.candidate_id,
        headers: req.headers,
        method: req.method,
        body: req.body,
        timestamp: new Date(),
        url: req.protocol + '://' + req.get('host') + req.originalUrl
    });

    next();
}
