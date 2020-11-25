import { Document } from 'mongoose'

export class User extends Document {
    email: string;
    name: string;
    password: string
}
