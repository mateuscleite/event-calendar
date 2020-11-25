import * as mongoose from 'mongoose'

export const EventSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId , ref: 'users' , required: true},
    guests: [{ type: mongoose.Schema.Types.ObjectId , ref: 'users' }],
    description: { type : String , required: true },
    start: { type : String , required: true },
    end: { type : String , required: true }
})