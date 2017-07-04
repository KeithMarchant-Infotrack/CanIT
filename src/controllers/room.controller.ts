import * as express from 'express';
import roomModel from '../models/room.model';
import validator from '../middleware/validator.middleware';

const roomController = express.Router();

roomController.use(validator);

roomController.post('/', async (req, res) => {
    const newRoom = await roomModel.create(req.body);

    res.status(200).json(newRoom);
});

roomController.get('/', async (req, res) => {
    const allRooms = await roomModel.find(req.body);

    res.status(200).json(allRooms);
});

roomController.get('/:id', async (req, res) => {
    const foundRoom = await roomModel.findById({_id: req.params.id});

    res.status(200).json(foundRoom);
});

roomController.delete('/:id', async (req, res) => {
    const delRoom = await roomModel.remove({_id: req.params.id});

    res.status(200).json(delRoom);
});

roomController.put('/:id', async (req, res) => {
    const editRoom = await roomModel.findOneAndUpdate({_id: req.params.id}, req.body);

    res.status(200).json(editRoom);
});

export default roomController;
