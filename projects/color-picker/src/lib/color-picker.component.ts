import {Component, forwardRef, Input, OnDestroy, OnInit, Optional, Self} from '@angular/core';
import {MatFormFieldControl} from '@angular/material/form-field';
import {BaseInputComponent} from '@kovalenko/base-components';
import {FormControl, NgControl, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
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
  private subs: Subscription;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    if (this._disabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
    this.stateChanges.next();
  }

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    @Optional() _parentForm: NgForm,
    _defaultErrorStateMatcher: ErrorStateMatcher,
  ) {
    super(_parentForm, _defaultErrorStateMatcher);

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.subs = this.control.valueChanges.subscribe(next => {
      this._ngModel = next;
      this.ngModelChange.emit(this._ngModel);
    });
  }

  onDestroy(): void {
    this.subs.unsubscribe();
  }

  get ngModel(): string {
    return this._ngModel;
  }
  set ngModel(v: string) {
    this._ngModel = v;
    this.control.setValue(v);
  }

  onContainerClick(event: MouseEvent) {
    super.onContainerClick(event);
    this.input.nativeElement.click();
  }

  onInput() {
    this.onTouched();
  }

}
