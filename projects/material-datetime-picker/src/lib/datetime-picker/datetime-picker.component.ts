import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Optional, Output, Self, ViewChild } from '@angular/core';
import {FormControl, NgControl, NgForm, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';
import {DateAdapter, ErrorStateMatcher, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatFormFieldControl } from '@angular/material/form-field';
import * as moment from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {BaseInputComponent} from '@kovalenko/base-components';

@Component({
  selector: 'ngc-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ru'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {
      provide: MAT_DATE_FORMATS, useValue: {
        parse: {
          dateInput: 'DD.MM.YYYY'
        },
        display: {
          dateInput: 'DD.MM.YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'DD.MM.YYYY',
          monthYearA11yLabel: 'MMMM YYYY'
        }
      }
    },
    {
      provide: MatFormFieldControl,
      useExisting: DatetimePickerComponent
    }
  ]
})
export class DatetimePickerComponent extends BaseInputComponent<moment.Moment> implements Validator, AfterViewInit, OnDestroy {
  dateControl = new FormControl();
  timeControl = new FormControl();
  @ViewChild('timeinput') timeinput: any;
  @Input() hasTimePicker = false;
  @Output() dateChange = new EventEmitter<moment.Moment>();

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    @Optional() _parentForm: NgForm,
    _defaultErrorStateMatcher: ErrorStateMatcher,
  ) {
    super(_parentForm, _defaultErrorStateMatcher);

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  private _min!: moment.Moment;

  get min(): moment.Moment {
    return this._min;
  }

  @Input() set min(v: moment.Moment) {
    this._min = v && moment(v);
  }

  private _max!: moment.Moment;

  get max(): moment.Moment {
    return this._max;
  }

  @Input() set max(v: moment.Moment) {
    this._max = v && moment(v);
  }

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  get ngModel(): moment.Moment {
    return this._ngModel;
  }

  set ngModel(v: moment.Moment) {
    this._ngModel = v;
    this.timeControl.setValue(v ? moment(v).format('HH:mm') : '');
    this.dateControl.setValue(v);
  }

  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  get focused(): boolean {
    return document.activeElement === this.input.nativeElement || this.timeinput != null && document.activeElement === this.timeinput.nativeElement;
  }

  ngAfterViewInit(): void {
    if (this.ngControl && this.ngControl.control) {
      this.ngControl.control.setValidators(this.validate.bind(this) as ValidatorFn);
    }
    this.onDisabledChange(this.disabled);
  }

  ngOnDestroy(): void { }

  protected onDisabledChange(v: boolean): void {
    if (v) {
      this.timeControl?.disable();
      this.dateControl?.disable();
    } else {
      this.timeControl?.enable();
      this.dateControl?.enable();
    }
  }

  openCalendar(picker: MatDatepicker<any>): void {
    picker.open();
    setTimeout(() => this.input.nativeElement.focus());
  }

  closeCalendar(): void {
    this.onTouched();
    setTimeout(() => this.input.nativeElement.blur());
  }

  onContainerClick(event: MouseEvent): void {
    let el = event.target as any;
    while (el && !(el.classList && el.classList.contains('timepicker')) && el.parentNode) {
      el = el.parentNode;
    }

    if (!el.tagName) {
      this.input.nativeElement.focus();
    } else if (el.classList && el.classList.contains('timepicker')) {
      this.timeinput.nativeElement.focus();
    }
  }

  clearDate($event: MouseEvent): void {
    $event.stopPropagation();
    $event.preventDefault();
    this.ngModel = undefined as any;
    this.update();
  }

  update(): void {
    this.ngControl?.control?.markAsDirty();
    this.ngControl?.control?.markAsTouched();


    let seconds = 0;
    if (this.timeControl.value) {
      seconds = moment(this.timeControl.value, 'HH:mm').diff(moment().startOf('day'), 's');
    }

    this._ngModel = this.dateControl.value && moment(this.dateControl.value).startOf('day').add(seconds, 's') || undefined;
    this.ngModelChange.emit(this._ngModel);
    this.dateChange.emit(this._ngModel);
  }

  validate(c: FormControl): ValidationErrors | null {
    if (this._min && this._ngModel && moment(this._ngModel).isBefore(this._min)) {
      return {min: this._min};
    }
    if (this._max && this._ngModel && moment(this._ngModel).isAfter(this._max)) {
      return {max: this._max};
    }

    return null;
  }
}
