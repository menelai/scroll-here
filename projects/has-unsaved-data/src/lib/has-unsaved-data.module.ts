import { NgModule } from '@angular/core';
import {HasUnsavedDataGuard} from './has-unsaved-data.guard';
import {MaterialConfirmModule} from '@kovalenko/material-confirm';

@NgModule({
  declarations: [],
  imports: [
    MaterialConfirmModule.config({
      width: '520px',
      panelClass: ['confirm-dialog-container'],
      disableClose: true,
      ok: 'Ok',
      cancel: 'Cancel',
      position: {
        top: '10px'
      },
    }),
  ],
  exports: [],
  providers: [
    HasUnsavedDataGuard
  ]
})
export class HasUnsavedDataModule { }
