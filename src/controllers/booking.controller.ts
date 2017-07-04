import * as express from 'express';
import bookingModel from '../models/booking.model';
import candidateModel from '../models/candidate.model';
import validator from '../middleware/validator.middleware';
import * as RequestHelper from '../helpers/request.helper';

const bookingController = express.Router();

bookingController.use(validator);

bookingController.post('/', async (req, res) => {
    // ToDo: Test this, Check for capacity, Date not in the past, Valid Date?
    const timeStart = new Date(req.body.time_start);
    const timeEnd = new Date(req.body.time_end);
    const token = RequestHelper.getBearerToken(req);

    const allBookings = await bookingModel.find();
    const myCandidate = await candidateModel.find({ token });

    for (const booking of allBookings) {
        const overlap = booking.time_start <= timeEnd && timeStart <= booking.time_end;

        if (overlap) {
            res.status(400).send('The selected timeslot conflicts with booking: ' + booking._id);
            return;
        }
    }

    const newBooking = await bookingModel.create(req.body);

    res.status(200).json(newBooking);
});

bookingController.get('/', async (req, res) => {
    const allBookings = await bookingModel.find(req.body);

    res.status(200).json(allBookings);
});

bookingController.get('/:id', async (req, res) => {
    const foundBooking = await bookingModel.findById({ _id: req.params.id });

    res.status(200).json(foundBooking);
});

bookingController.delete('/:id', async (req, res) => {
    // ToDo: Check if the original creator/admin is doing this first?
    const delBooking = await bookingModel.remove({ _id: req.params.id });

    res.status(200).json(delBooking);
});

bookingController.put('/:id', async (req, res) => {
    // ToDo: Check if the timeslot is available first? Check for capacity?
    const editBooking = await bookingModel.findOneAndUpdate({ _id: req.params.id }, req.body);

    res.status(200).json(editBooking);
});

export default bookingController;
