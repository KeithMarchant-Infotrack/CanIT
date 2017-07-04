import * as express from 'express';
import * as candidateModel from '../models/candidate.model';
import * as jwt from 'jwt-simple';

const config = require('../../config.json');

var app = express();
app.set('jwtTokenSecret', 'NOT_A_VERY_SECRET_TOKEN');

export class Tokeniser {

    public static generate(options: candidateModel.ICandidateModel) {
        return Tokeniser.generateToken(options.email);
    }

    public static decode(token: string) {
        return Tokeniser.decodeToken(token);
    }

    private static generateToken(email: string) {
        const payload = { email };
        var secret = app.get('jwtTokenSecret');
        const token = jwt.encode(payload, secret);
        return token;
    };

    private static decodeToken(token: string) {
        var secret = app.get('jwtTokenSecret');
        var decoded = jwt.decode(token, secret);
        return decoded;
    };

}
