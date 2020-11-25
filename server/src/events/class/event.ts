import { Document } from 'mongoose'

export class Event extends Document {
    owner: string;
    guests: Array<string>;
    description: string;
    start: string;
    end: string;
}
