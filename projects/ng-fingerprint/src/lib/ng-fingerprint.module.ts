import {ModuleWithProviders, NgModule} from '@angular/core';
import {LOCALSTORAGE_NAME, NgFingerprintService} from './ng-fingerprint.service';

@NgModule({
  providers: [
    NgFingerprintService,
  ]
})
export class NgFingerprintModule {
  static config(localStorageName: string): ModuleWithProviders<NgFingerprintModule> {
    return {
      ngModule: NgFingerprintModule,
      providers: [
        {provide: LOCALSTORAGE_NAME, useValue: localStorageName},
        NgFingerprintService,
      ]
    };
  }
}
