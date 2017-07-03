import { Document, Schema, Model, model } from 'mongoose';

interface IBooking {
    email: string;
    name: string;
    time_start: Date;
    time_end: Date;
    persons: number;
    room_id: number;
    user_id: number;
}

interface IBookingModel extends IBooking, Document { }

const bookingSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    time_start: {
        type: Date,
        required: true
    },
    time_end: {
        type: Date,
        required: true
    },
    persons: {
        type: Number
    },
    room_id: {
        type: Schema.Types.ObjectId,
        ref: 'roomSchema',
        required: true
    }
    /* user_id: {
        type: Schema.Types.ObjectId,
        ref: 'userSchema',
        required: true
    } */

});

const bookingModel = model<IBookingModel>('booking', bookingSchema);

export default bookingModel;
