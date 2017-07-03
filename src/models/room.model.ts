import { Document, Schema, Model, model } from 'mongoose';

interface IRoom {
    email: string;
}

interface IRoomModel extends IRoom, Document { }

const roomSchema = new Schema({
    name: {
        type: String,
        Required: ''
    },
    capacity: {
        type: Number,
    }
});

const roomModel = model<IRoomModel>('Room', roomSchema);

export default roomModel;
