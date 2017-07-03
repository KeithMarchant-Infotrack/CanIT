import * as express from 'express';
import roomModel from '../models/room.model';

const roomRouter = express.Router();

roomRouter.post('/', async (req, res) => {
    const newRoom = await roomModel.create(req.body);

    res.status(200).json(newRoom);
});

export default roomRouter;