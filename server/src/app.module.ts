import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'

import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://calendar_user:zLCREdDOpNRsx2Mi@calendarcluster.vfdws.mongodb.net/eventCalendar?retryWrites=true&w=majority'),
    UsersModule,
    EventsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
