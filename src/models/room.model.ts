import { Document, Schema, Model, model } from 'mongoose';

interface IRoom {
    name: string;
    capacity: number;
    phone: number;
    type: string;
    email: string;
    location: string;
    description: string;
}

interface IRoomModel extends IRoom, Document { }

const roomSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    capacity: {
        type: Number,
        min: 1,
        max: 200
    },
    phone: {
        type: Number,
        min: 10,
        max: 10
    },
    type: {
        type: String,
        enum: ['office', 'boardroom']
    },
    email: {
        type: String,
        // tslint:disable
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    location: {
        type: String
    },
    description: {
        type: String
    }
});

const roomModel = model<IRoomModel>('Room', roomSchema);

export default roomModel;
