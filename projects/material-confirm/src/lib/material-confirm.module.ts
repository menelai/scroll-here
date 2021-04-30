import {ModuleWithProviders, NgModule} from '@angular/core';
import {ConfirmDirective} from './confirm/confirm.directive';
import {ConfirmDialogComponent} from './confirm/confirm-dialog/confirm-dialog.component';
import {ConfirmService} from './confirm/confirm.service';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MaterialConfirmConfig} from './material-confirm-config.interface';
import { config } from './confirm.config';
import {A11yModule} from '@angular/cdk/a11y';

@NgModule({
  declarations: [
    ConfirmDirective,
    ConfirmDialogComponent,
  ],
  imports: [
    MatDialogModule,
    MatButtonModule,
    A11yModule,
    CommonModule
  ],
  exports: [
    ConfirmDirective
  ],
  providers: [
    ConfirmService,
  ]
})
export class MaterialConfirmModule {
  static config(conf?: MaterialConfirmConfig): ModuleWithProviders<MaterialConfirmModule> {
    return {
      ngModule: MaterialConfirmModule,
      providers: [
        {
          provide: config,
          useValue: conf
        }
      ]
    };
  }
}
