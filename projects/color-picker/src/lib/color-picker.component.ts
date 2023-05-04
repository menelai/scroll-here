import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {MatFormFieldControl} from '@angular/material/form-field';
import {BaseInputComponent} from '@kovalenko/base-components';
import {FormControl} from '@angular/forms';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {Subscription} from 'rxjs';

@Component({
  selector: 'ngc-color-picker',
  template: `
    <div>
      <div><input [disabled]="disabled" type="color" matInput [formControl]="control" #matinput [class.op0]="!control.value" (input)="onInput()"></div>
      <button *ngIf="control.value" type="button" mat-icon-button (click)="$event.stopPropagation(); $event.preventDefault(); control.setValue(null)">
        <mat-icon>cancel</mat-icon>
      </button>
    </div>
  `,
  styleUrls: ['./color-picker.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: forwardRef(() => ColorPickerComponent),
      multi: true,
    },
  ]
})
export class ColorPickerComponent extends BaseInputComponent<string> implements OnInit, OnDestroy {
  control = new FormControl();

  @Input()
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    if (this._disabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
    this.stateChanges.next();
  }

  get disabled(): boolean {
    return this._disabled;
  }

  set ngModel(v: string) {
    this._ngModel = v;
    this.control.setValue(v);
  }

  get ngModel(): string {
    return this._ngModel;
  }

  private subs: Subscription;

  constructor() {
    super();

    this.subs = this.control.valueChanges.subscribe(next => {
      this._ngModel = next;
      this.ngModelChange.emit(this._ngModel);
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onContainerClick(event: MouseEvent) {
    super.onContainerClick(event);
    this.input.nativeElement.click();
  }

  onInput() {
    this.onTouched();
  }

}
