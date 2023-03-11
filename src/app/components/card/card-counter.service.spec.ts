import { TestBed } from '@angular/core/testing';

import { CardCounterService } from './card-counter.service';

describe('CardCounterService', () => {
  let service: CardCounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardCounterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
