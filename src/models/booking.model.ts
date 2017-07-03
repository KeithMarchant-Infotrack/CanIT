import { Document, Schema, Model, model } from 'mongoose';

interface IBooking {
    email: string;
}

interface IBookingModel extends IBooking, Document { }

const bookingSchema = new Schema({
    email: String
});

const bookingModel = model<IBookingModel>('booking', bookingSchema);

export default bookingModel;
