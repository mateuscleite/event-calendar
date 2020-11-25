import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'This is the Event Calendar API\nMade By mateuscleite';
  }
}
