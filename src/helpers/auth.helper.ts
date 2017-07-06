import * as express from 'express';
import * as candidateModel from '../models/candidate.model';
import tokenModel from '../models/token.model';
import * as jwt from 'jwt-simple';

const config = require('../../config.json');

var app = express();
app.set('jwtTokenSecret', 'NOT_A_VERY_SECRET_TOKEN');

export class Tokeniser {

    public static generate(options: candidateModel.ICandidateModel) {
        return Tokeniser.generateToken(options._id, options.secret);
    }

    public static decode(token: string) {
        return Tokeniser.decodeToken(token);
    }

    private static generateToken(id: string, secret: string) {
        let expiry = new Date();
        expiry.setHours( expiry.getHours() + 4 );
        const payload = { id, secret, expiry };
        var public_secret = app.get('jwtTokenSecret');
        const token = jwt.encode(payload, public_secret);
        tokenModel.create({ value: token, expires_at: expiry, candidate_id: id });
        return [token, expiry];
    };

    private static decodeToken(token: string) {
        var public_secret = app.get('jwtTokenSecret');
        var decoded = jwt.decode(token, public_secret);
        return decoded;
    };

}
