import * as express from 'express';
import candidateModel from '../models/candidate.model';

const authController = express.Router();

authController.post('/', async (req, res) => {
    if(req.body.token){
        var candidate = await candidateModel.find(req.body);
        if(candidate){
            res.status(200).json({authorised:true}).end();
        }
    }
    res.status(401).json({authorised:false}).end();
});

authController.post('/gettoken', async (req, res) => {
    const candidate = await candidateModel.findOne(req.body);
    if(candidate){
        res.status(200).json({authorised:true, token:candidate.token}).end();
    } else {
        res.status(401).json({authorised:false}).end();
    }
});

export default authController;
