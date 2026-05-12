import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {CdkDrag, CdkDragHandle} from '@angular/cdk/drag-drop';
import {A11yModule} from '@angular/cdk/a11y';
import {MatDialogDragBoundsModule} from '@kovalenko/mat-dialog-drag-bounds';

interface ConfirmDialogData {
  title: string;
  message: string;
  buttons?: {ok: string, cancel: string};
  actions?: {value: any, title: string}[];
}

@Component({
  selector: 'ngc-confirm',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    CdkDrag,
    CdkDragHandle,
    A11yModule,
    MatDialogDragBoundsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ]
})
export class ConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
  ) { }
}
