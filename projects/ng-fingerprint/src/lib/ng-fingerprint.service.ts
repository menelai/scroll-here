import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

@Injectable()
export class NgFingerprintService {
  readonly fingerprint$ = new ReplaySubject<string | null>(1);

  constructor() {
    FingerprintJS.load().then(fp => fp.get()).then(result => {
      this.fingerprint$.next(result.visitorId);
    })
  }
}
