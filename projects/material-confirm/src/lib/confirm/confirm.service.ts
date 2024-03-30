import {Inject, Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {MaterialConfirmConfig} from '../material-confirm-config.interface';
import { config as c } from '../confirm.config';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  private dialogInstance?: MatDialogRef<ConfirmDialogComponent, any>;

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
    config?: MatDialogConfig,
    actions?: {value: any, title: string}[],
  ): Promise<boolean> {
    this.dialogInstance = this.dialog.open(ConfirmDialogComponent, {
      ...this.config,
      ...config,
      closeOnNavigation: true,
      data: {
        title: confirmTitle,
        message: [confirmMessage],
        buttons: {
          ok: confirmOk,
          cancel: confirmCancel,
        },
        actions,
      }
    });

    return firstValueFrom(this.dialogInstance.afterClosed());
  }

  cancel(): void {
    this.dialogInstance?.close();
  }
}
