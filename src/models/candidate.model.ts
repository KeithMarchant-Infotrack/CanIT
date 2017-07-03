import { Document, Schema, Model, model } from 'mongoose';
import * as nodemailer from 'nodemailer';
import * as jwt from 'jwt-simple';

interface ICandidate {
    email: string;
    token: string;
}

interface ICandidateModel extends ICandidate, Document { }

const candidateSchema = new Schema({
    email: { type: String, required: true, unique: true },
    token: String
}).pre('save', function(next) {
    if (!this.token) {
        this.token = generateToken(this.email);
    }
    next();
}).pre('save', function(next) {
    sendEmail(this);
    next();
});

const generateToken = (email: string) => {
    const payload = { email };
    const secret = 'NOT_A_VERY_SECRET_TOKEN';
    const token = jwt.encode(payload, secret);

    return token;
};

const sendEmail = async (candidate: ICandidate) => {
    const emailAddress = 'canit.infotrack@gmail.com';

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: emailAddress,
            pass: 'InfoTrack@135135'
        }
    });

    const mailOptions = {
        from: emailAddress,
        to: candidate.email,
        subject: 'Your InfoTrack practical link',
        text: 'http://localhost:3000/candidate/' + candidate.token
    };

    await transporter.sendMail(mailOptions);
};

const candidateModel = model<ICandidateModel>('Candidate', candidateSchema);

export default candidateModel;
