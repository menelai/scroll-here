import { TestBed } from '@angular/core/testing';

import { NgFingerprintService } from './ng-fingerprint.service';

describe('NgFingerprintService', () => {
  let service: NgFingerprintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgFingerprintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
