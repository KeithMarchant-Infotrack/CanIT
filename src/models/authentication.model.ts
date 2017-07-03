import { Document, Schema, Model, model } from 'mongoose';

interface IAuth {
    email: string;
    token: string;
}

interface IAuthModel extends IAuth, Document { }

const authenticationSchema = new Schema({
    email: String,
    token: String
});

const authenticationModel = model<IAuthModel>('Auth', authenticationSchema);

export default authenticationModel;
