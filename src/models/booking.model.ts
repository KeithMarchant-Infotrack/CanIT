import { Document, Schema, Model, model } from 'mongoose';

interface IBooking {
    email: string;
}

interface IBookingModel extends IBooking, Document { }

const bookingSchema = new Schema({
    name: {
        type: String,
        Required: ''
    },
    booked_by: {
        type: String,
    },
    time_start: {
        type: Number,
    },
    time_end: {
        type: Number,
    },
    persons: {
        type: Number,
    },
    room_id: {
        type: Number,
        Required: ''
    },

});

const bookingModel = model<IBookingModel>('booking', bookingSchema);

export default bookingModel;
