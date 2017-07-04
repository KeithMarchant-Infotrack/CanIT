import * as express from 'express';
import bookingModel from '../models/booking.model';
import candidateModel from '../models/candidate.model';

const bookingController = express.Router();

bookingController.post('/', async (req, res) => {

    //ToDo: Test this, Check for capacity, Date not in the past, Valid Date?
    var time_start = new Date(req.body.time_start);
    var time_end = new Date(req.body.time_end);
    var authorization = req.headers.authorization;
    //var token = authorization.replace("Bearer ", "");

    var allBookings = await bookingModel.find();
    var myCandidate = await candidateModel.find({token: authorization});

    for( let booking of allBookings ) {
        var overlap = booking.time_start <= time_end && time_start <= booking.time_end;

        if(overlap) {
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
    const foundBooking = await bookingModel.findById({_id: req.params.id});

    res.status(200).json(foundBooking);
});

bookingController.delete('/:id', async (req, res) => {
    //ToDo: Check if the original creator/admin is doing this first?
    const delBooking = await bookingModel.remove({_id: req.params.id});

    res.status(200).json(delBooking);
});

bookingController.put('/:id', async (req, res) => {
    //ToDo: Check if the timeslot is available first? Check for capacity?
    const editBooking = await bookingModel.findOneAndUpdate({_id: req.params.id}, req.body);

    res.status(200).json(editBooking);
});

export default bookingController;