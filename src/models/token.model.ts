import { Document, Schema, Model, model } from 'mongoose';

interface IToken {
    value: String;
    expires_at: Date;
    candidate_id: String;
}

export interface ITokenModel extends IToken, Document { }

const tokenSchema = new Schema({
    value: { type: String, required: true, unique: true },
    expires_at: { type: Date },
    candidate_id: {
        type: Schema.Types.ObjectId,
        ref: 'candidateSchema',
        required: true
    }
})

const tokenModel = model<ITokenModel>('Token', tokenSchema);
export default tokenModel;