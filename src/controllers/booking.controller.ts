import * as express from 'express';
import bookingModel from '../models/booking.model';

const bookingController = express.Router();

bookingController.post('/', async (req, res) => {
    const newBooking = await bookingModel.create(req.body);

    res.status(200).json(newBooking);
});

export default bookingController;