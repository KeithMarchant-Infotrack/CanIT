import * as express from 'express';
import roomModel from '../models/room.model';

const roomRouter = express.Router();

roomRouter.post('/', async (req, res) => {
    const newRoom = await roomModel.create(req.body);

    res.status(200).json(newRoom);
});

roomRouter.get('/', async (req, res) => {
    const allRooms = await roomModel.find(req.body);

    res.status(200).json(allRooms);
});

roomRouter.delete('/', async (req, res) => {
    const delRoom = await roomModel.remove(req.body);

    res.status(200).json(delRoom);
});

/*
roomRouter.put('/', async (req, res) => {
    const editRoom = await roomModel.update(req.body);

    res.status(200).json(editRoom);
});
*/

export default roomRouter;