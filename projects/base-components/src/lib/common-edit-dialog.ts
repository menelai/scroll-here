import {Directive, inject, output, signal} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
import {COMMON_EDIT_DIALOG_SNACK} from './config';

@Directive()
export class CommonEditDialog<T> {
  readonly id = inject<{id: string}>(MAT_DIALOG_DATA).id;

  readonly snackConfig = inject(COMMON_EDIT_DIALOG_SNACK);

  readonly h1 = signal(' ');

  readonly busy = signal(false);

  readonly dialogClose = output<void>();

  readonly saved = output<T>();

  protected readonly dialogRef = inject<MatDialogRef<CommonEditDialog<T>>>(MatDialogRef);

  protected readonly snackBar = inject(MatSnackBar);

  protected readonly t = inject(TranslateService);

  async save(): Promise<void> {
    if (this.busy()) {
      return;
    }

    this.busy.set(true);
  }

  protected readonly onInvalid = (): void => {
    this.snackBar.open(this.t.instant('Check form validity'), undefined, this.snackConfig);
  };
}
