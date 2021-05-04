import {ModuleWithProviders, NgModule} from '@angular/core';
import {ConfirmService} from './confirm/confirm.service';
import {ConfirmDirective} from './confirm/confirm.directive';
import {ConfirmComponent} from './confirm/confirm.component';
import {BootstrapConfirmConfig} from './bootstrap-confirm-config.interface';
import { config } from './confirm.config';

@NgModule({
  declarations: [
    ConfirmDirective,
    ConfirmComponent
  ],
  imports: [
  ],
  exports: [
    ConfirmDirective
  ],
  providers: [
    ConfirmService
  ]
})
export class BootstrapConfirmModule {
  static config(conf?: BootstrapConfirmConfig): ModuleWithProviders<BootstrapConfirmModule> {
    return {
      ngModule: BootstrapConfirmModule,
      providers: [
        {
          provide: config,
          useValue: conf
        }
      ]
    };
  }
}
