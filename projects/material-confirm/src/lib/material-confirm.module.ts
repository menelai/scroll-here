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
import {MatDialogDragBoundsModule} from '@kovalenko/mat-dialog-drag-bounds';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    ConfirmDirective,
    ConfirmDialogComponent,
  ],
  imports: [
    MatDialogModule,
    MatButtonModule,
    DragDropModule,
    MatDialogDragBoundsModule,
    A11yModule,
    CommonModule,
    TranslateModule,
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
