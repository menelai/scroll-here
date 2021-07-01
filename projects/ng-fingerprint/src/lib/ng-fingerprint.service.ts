import {Inject, Injectable, InjectionToken} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import FingerprintJS, {BuiltinComponents} from '@fingerprintjs/fingerprintjs';

export const NG_FINGERPRINT_FIELDS = new InjectionToken<(keyof BuiltinComponents)[]>('NG_FINGERPRINT_FIELDS');

@Injectable()
export class NgFingerprintService {
  readonly fingerprint$ = new ReplaySubject<string | null>(1);

  constructor(@Inject(NG_FINGERPRINT_FIELDS) components: (keyof BuiltinComponents)[]) {
    FingerprintJS.load().then(fp => fp.get()).then(result => {
      if (components.length > 0) {
        Object.keys(result.components).forEach((key: any) => {
          if (!components.includes(key)) {
            delete (result.components as any)[key];
          }
        });
      }
      this.fingerprint$.next(result.visitorId);
    })
  }
}
