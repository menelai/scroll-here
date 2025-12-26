import {Directive, ElementRef, inject, OnInit, output, signal, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Title} from '@angular/platform-browser';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {TranslateService} from '@ngx-translate/core';
import {filter, Subscription} from 'rxjs';

@UntilDestroy()
@Directive()
export class BaseEditDialogComponent implements OnInit {
  @ViewChild('sbm', {static: false}) sbm?: ElementRef<HTMLButtonElement>;

  @ViewChild(NgForm, {static: false}) form?: NgForm;

  readonly dialogClose = output();

  readonly saved = output();

  readonly busy = signal(false);

  readonly pending = signal(false);

  readonly h1 = signal('');

  protected _save = Subscription.EMPTY;

  protected readonly title = inject(Title);

  protected readonly dialogInstance = inject(MatDialogRef<BaseEditDialogComponent, any>);

  protected readonly snackBar = inject(MatSnackBar);

  protected readonly translate = inject(TranslateService);

  ngOnInit(): void {
    this.dialogInstance.keydownEvents().pipe(
      filter(e => e.code === 'Escape'),
      untilDestroyed(this),
    ).subscribe(() => this.close());
  }

  close(): void {
    this.dialogClose.emit();
  }
}
