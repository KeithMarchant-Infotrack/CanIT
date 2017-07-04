import { Document, Schema, Model, model } from 'mongoose';
import { Tokeniser } from '../helpers/auth.helper';

interface ICandidate {
    email: string;
    token: string;
    file: string;
}

export interface ICandidateModel extends ICandidate, Document { }

const candidateSchema = new Schema({
    email: { type: String, required: true, unique: true },
    token: String,
    file: String
}).pre('save', function(next) {
    if (!this.token) {
        this.token = Tokeniser.generate(this);
    }
    next();
});

export default model<ICandidateModel>('Candidate', candidateSchema);
