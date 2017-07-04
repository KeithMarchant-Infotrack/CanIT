import { Document, Schema, Model, model } from 'mongoose';
import * as jwt from 'jwt-simple';

interface ICandidate {
    email: string;
    token: string;
    file: string;
}

interface ICandidateModel extends ICandidate, Document { }

const candidateSchema = new Schema({
    email: { type: String, required: true, unique: true },
    token: String,
    file: String
}).pre('save', function(next) {
    if (!this.token) {
        this.token = generateToken(this.email);
    }
    next();
});

const generateToken = (email: string) => {
    const payload = { email };
    const secret = 'NOT_A_VERY_SECRET_TOKEN';
    const token = jwt.encode(payload, secret);

    return token;
};

export default model<ICandidateModel>('Candidate', candidateSchema);
