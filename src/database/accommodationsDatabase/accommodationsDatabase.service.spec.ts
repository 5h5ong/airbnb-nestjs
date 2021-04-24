import { Test, TestingModule } from '@nestjs/testing';
import { AccommodationsDatabaseService } from './accommodationsDatabase.service';

describe('AccommodationsDatabaseService', () => {
  let service: AccommodationsDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccommodationsDatabaseService],
    }).compile();

    service = module.get<AccommodationsDatabaseService>(
      AccommodationsDatabaseService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
