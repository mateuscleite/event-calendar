import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';

describe('EventsService', () => {
  let provider: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsService],
    }).compile();

    provider = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
