import {ModuleWithProviders, NgModule} from '@angular/core';
import {NG_FINGERPRINT_FIELDS, NgFingerprintService} from './ng-fingerprint.service';
import {BuiltinComponents} from '@fingerprintjs/fingerprintjs';

@NgModule({
  providers: [
    NgFingerprintService,
    {provide: NG_FINGERPRINT_FIELDS, useValue: []},
  ]
})
export class NgFingerprintModule {
  static config(fields: (keyof BuiltinComponents)[]): ModuleWithProviders<NgFingerprintModule> {
    return {
      ngModule: NgFingerprintModule,
      providers: [
        {provide: NG_FINGERPRINT_FIELDS, useValue: fields},
        NgFingerprintService,
      ]
    };
  }
}
