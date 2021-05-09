import { TestBed } from '@angular/core/testing';

import { TranslatableTitleService } from './translatable-title.service';

describe('TranslatableTitleService', () => {
  let service: TranslatableTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslatableTitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
