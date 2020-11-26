import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EventsService } from './provider/events.service';
import { Event } from './class/event'

@Controller('events')
export class EventsController {
    constructor(private eventsService: EventsService){

    }

    @Get()
    async getAll(): Promise<Event[]>{
        return this.eventsService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<Event>{
        return this.eventsService.getById(id);
    }

    @Get('owner/:id')
    async getAllByOwner(@Param('id') id: string): Promise<Event[]>{
        return this.eventsService.getAllByOwner(id)
    }

    @Post()
    async create(@Body() event: Event) : Promise<Event> {
        return this.eventsService.create(event);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() event: Event): Promise<Event>{
        return this.eventsService.update(id, event);
    }

    @Delete(':id')
    async delete(@Param('id') id: string){
        this.eventsService.delete(id)
    }
}
