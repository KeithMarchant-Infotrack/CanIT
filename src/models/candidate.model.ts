import { Document, Schema, Model, model } from 'mongoose';

interface ICandidate {
    email: string;
}

interface ICandidateModel extends ICandidate, Document { }

const candidateSchema = new Schema({
    email: String
});

const candidateModel = model<ICandidateModel>('Candidate', candidateSchema);

export default candidateModel;
