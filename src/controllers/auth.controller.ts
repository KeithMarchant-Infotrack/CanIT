import * as express from 'express';
import candidateModel from '../models/candidate.model';
import tokenModel from '../models/token.model';
import { Tokeniser } from '../helpers/auth.helper';

const authController = express.Router();

authController.post('/gettoken', async (req, res) => {
    if(req.body.grant_type === "client_credentials") {
        var auth: any = req.headers.authorization;

        if(!auth) {
            res.status(401).send();
            return;
        }

        var regexp = /^Basic (.+)$/;
        var match = regexp.exec(auth);

        if(match) {
            var buffer = new Buffer(match[1], 'base64')
            var base64_decoded = buffer.toString();
            var credentials = base64_decoded.split(":");

            if(credentials.length === 2) {
                var client_id = credentials[0];
                var client_secret = credentials[1];

                const candidate = await candidateModel.findById({ _id: client_id });
                if (candidate) {
                    const tokens = await tokenModel.find({ candidate_id: client_id });

                    if(tokens.length > 0) {
                        for( const token of tokens ) {
                            if( token.expires_at > new Date() ) {
                                res.status(200).json({authorised: true, expires_at: token.expires_at, access_token: token.value}).send();
                                return;
                            }
                        }
                    }

                    var new_token = Tokeniser.generate(candidate);
                    res.status(200).json({authorised: true, expires_at: new_token[1], access_token: new_token[0]}).send();
                    return;
                }
            }
        }

        res.status(400).send();

    }
    res.status(400).send();
});

export default authController;
