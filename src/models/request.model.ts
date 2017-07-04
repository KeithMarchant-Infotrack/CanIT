import * as mongoose from 'mongoose';

interface IRequest {
    candidate: mongoose.Schema.Types.ObjectId;
    method: string;
    body: any;
    timestamp: Date;
    url: string;
    headers: any;
}

interface IRequestModel extends IRequest, mongoose.Document { }

const requestSchema = new mongoose.Schema({
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate',
        required: true
    },
    method: String,
    body: mongoose.Schema.Types.Mixed,
    timestamp: Date,
    url: String,
    headers: mongoose.Schema.Types.Mixed
});

export default mongoose.model<IRequestModel>('Request', requestSchema);
