import * as express from 'express';
import candidateModel from '../models/candidate.model';
//import * as jwt from 'jwt-simple';

var jwt = require('jwt-simple');
var app = express();
app.set('jwtTokenSecret', 'NOT_A_VERY_SECRET_TOKEN');

const authController = express.Router();

/*authController.post('/', async (req, res) => {
    console.log('hello');
    //const newCandidate = await candidateModel.create(req.body);

    //res.status(200).json(newCandidate);
    
});*/


/*authController.post('/', async (req, res) => {
    //const newCandidate = await candidateModel.create(req.body);

    res.status(200).json("newCandidate");
});


authController.get('/:userName/:email',  (req, res, next) => {
    
    res.status(200)
            .json(registerUser(req))
            .end();

});*/

module.exports = {
    register : async function(req:express.Request, res:express.Response, next:express.NextFunction){

    var user = registerUser(req);

    var newCandidate = await candidateModel.create(user);
    console.log(newCandidate);

    res.status(200)
        .json(newCandidate)
        .end();
}

    /*authorise : function(req:express.Request, res:express.Response, next:express.NextFunction){
        if(!isAuthorised(req)){
            res.sendStatus(401).end();
        } else {
            res.status(200)
            .json(
                { 
                    authorised: true, 
                    //authToken: req.params.authToken 
                }
            )
            .end();
        }
    }*/
}

var registerUser = function (req:express.Request) {
    var token = generateToken(req.params.email);
    var user = {
        //userName: req.params.userName,
        email: req.params.email,
        token: token
    }
    //save user to db...
    return user;
}

var generateToken = function (email:string) {  
    var payload = { email: email };
    var secret = app.get('jwtTokenSecret');
    var token = jwt.encode(payload, secret);
    return token; 
}

var decodeToken = function(token:string){
    var secret = app.get('jwtTokenSecret');
    var decoded = jwt.decode(token, secret);
    return decoded;
}

export default authController;