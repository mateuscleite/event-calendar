import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from '../class/event';

@Injectable()
export class EventsService {
    constructor(@InjectModel('Event') private readonly eventModel: Model<Event>){}

    async getAll(){
        return await this.eventModel.find().exec()
    }

    async getById(id: string){
        return await this.eventModel.findById(id).exec()
    }

    async getAllByOwner(ownerId: string){
        return await this.eventModel.find({'owner': ownerId}).exec()
    }

    async create(event: Event){
        const newEvent = new this.eventModel(event)
        return await newEvent.save();
    }
    
    async update(id: string, event: Event){
        await this.eventModel.updateOne({_id: id}, event).exec()
        return this.getById(id);
    }

    async delete(id: string){
        return await this.eventModel.deleteOne({_id: id}).exec();
    }
}
