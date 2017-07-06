import { Document, Schema, Model, model } from 'mongoose';
import { Tokeniser } from '../helpers/auth.helper';
import * as crypto from 'crypto';

interface ICandidate {
    email: string;
    secret: string;
    file: string;
}

export interface ICandidateModel extends ICandidate, Document { }

const candidateSchema = new Schema({
    email: { type: String, required: true, unique: true },
    secret: String,
    file: String
}).pre('save', function(next) {
    this.secret = crypto.randomBytes(20).toString('hex');
    this.token = Tokeniser.generate(this);
    next();
});

export default model<ICandidateModel>('Candidate', candidateSchema);
