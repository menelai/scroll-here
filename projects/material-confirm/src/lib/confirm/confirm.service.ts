import {Inject, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {MaterialConfirmConfig} from '../material-confirm-config.interface';
import { config as c } from '../confirm.config';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor(
    @Inject(c) private config: MaterialConfirmConfig,
    private dialog: MatDialog
  ) { }

  setDefaults(title: string, ok: string, cancel: string): void {
    this.config ??= {};
    this.config.title = title;
    this.config.ok = ok;
    this.config.cancel = cancel;
  }

  confirm(
    confirmMessage: string,
    confirmTitle = this.config?.title || '',
    confirmOk = this.config?.ok || 'ok',
    confirmCancel = this.config?.cancel || 'cancel',
  ): Promise<boolean> {
    return this.dialog.open(ConfirmDialogComponent, {
      ...this.config,
      closeOnNavigation: true,
      data: {
        title: confirmTitle,
        message: [confirmMessage],
        buttons: {
          ok: confirmOk,
          cancel: confirmCancel,
        }
      }
    }).afterClosed().toPromise();
  }
}
