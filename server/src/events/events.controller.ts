import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { EventsService } from './provider/events.service';
import { Event } from './class/event'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('events')
export class EventsController {
    constructor(private eventsService: EventsService){

    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(): Promise<Event[]>{
        return this.eventsService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getById(@Param('id') id: string): Promise<Event>{
        return this.eventsService.getById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('owner/:id')
    async getAllByOwner(@Param('id') id: string): Promise<Event[]>{
        return this.eventsService.getAllByOwner(id)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() event: Event) : Promise<Event> {
        return this.eventsService.create(event);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() event: Event): Promise<Event>{
        return this.eventsService.update(id, event);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string){
        this.eventsService.delete(id)
    }
}
