import {InjectionToken} from '@angular/core';

export const COMMON_EDIT_DIALOG_SNACK = new InjectionToken<{duration: number, panelClass?: string}>(
  'CommonDialogSnackConfig',
  {
    providedIn: 'root',
    factory: () => ({duration: 5000, panelClass: 'warning'})
  }
);
