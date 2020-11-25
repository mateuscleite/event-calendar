import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsController } from './events.controller';
import { EventsService } from './provider/events.service';
import { EventSchema } from './schema/event.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Event', schema: EventSchema}])
      ],
      controllers: [EventsController],
      providers: [EventsService]
})
export class EventsModule {}
