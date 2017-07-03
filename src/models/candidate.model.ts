import { Document, Schema, Model, model } from 'mongoose';

const jwt = require('jwt-simple');
interface ICandidate {
    email: string;
    token: string;
}

interface ICandidateModel extends ICandidate, Document { }

const candidateSchema = new Schema({
    email: { type: String, required: true, unique: true },
    token: String
}).pre('save', function(next) {
    if(!this.token){
        this.token = generateToken(this.email);
    }
  next();
  //return this;
});

var generateToken = function (email:string) {  
    var payload = { email: email };
    var secret = 'NOT_A_VERY_SECRET_TOKEN';
    var token = jwt.encode(payload, secret);
    return token; 
}

const candidateModel = model<ICandidateModel>('Candidate', candidateSchema);

export default candidateModel;
