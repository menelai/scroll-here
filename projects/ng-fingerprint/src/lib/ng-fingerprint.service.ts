import {Inject, Injectable, InjectionToken} from '@angular/core';
import {ReplaySubject} from 'rxjs';
// @ts-ignore
import Fingerprint2 from 'fingerprintjs2';

export const LOCALSTORAGE_NAME = new InjectionToken<string>('LOCALSTORAGE_NAME');

@Injectable()
export class NgFingerprintService {
  readonly fingerprint$ = new ReplaySubject<string | null>(1);

  constructor(@Inject(LOCALSTORAGE_NAME) localstorageName: string = 'devicefingerprint') {
    let fp = localStorage.getItem(localstorageName);
    if (fp) {
      this.fingerprint$.next(fp);
    } else {
      Fingerprint2.getPromise().then((components: any[]) => {
        fp = Fingerprint2.x64hash128(components.map(c => c.value).join(''), 31);
        localStorage.setItem(localstorageName, fp as string);
        this.fingerprint$.next(fp);
      });
    }
  }
}
