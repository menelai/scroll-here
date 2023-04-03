import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import {FormControl, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatFormFieldControl } from '@angular/material/form-field';
import { LuxonDateAdapter } from '@angular/material-luxon-adapter';
import {BaseInputComponent} from '@kovalenko/base-components';
import {DateTime} from 'luxon';

@Component({
  selector: 'ngc-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ru'},
    {provide: DateAdapter, useClass: LuxonDateAdapter, deps: [MAT_DATE_LOCALE]},
    {
      provide: MAT_DATE_FORMATS, useValue: {
        parse: {
          dateInput: 'DD.MM.yyyy'
        },
        display: {
          dateInput: 'dd.MM.yyyy',
          monthYearLabel: 'MMM yyyy',
          dateA11yLabel: 'DD.MM.yyyy',
          monthYearA11yLabel: 'MMMM yyyy'
        }
      }
    },
    {
      provide: MatFormFieldControl,
      useExisting: DatetimePickerComponent
    }
  ]
})
export class DatetimePickerComponent extends BaseInputComponent<DateTime | null> implements Validator, AfterViewInit, OnDestroy {
  hourCycle = ['AM', 'PM'].includes((new Date(64_800_000)).toLocaleTimeString().slice(-2).toUpperCase()) ? 'h12' : 'h24';
  dateControl = new FormControl<DateTime | null>(null);
  timeControl = new FormControl();
  @ViewChild('timeinput') timeinput: any;
  @Input() hasTimePicker = false;
  @Input() defaultTime = 0;
  @Output() dateChange = new EventEmitter<DateTime | null>();

  private _min!: DateTime | null;

  get min(): DateTime | null {
    return this._min;
  }

  @Input() set min(v: DateTime | null) {
    this._min = v;
  }

  private _max!: DateTime | null;

  get max(): DateTime | null {
    return this._max;
  }

  @Input() set max(v: DateTime | null) {
    this._max = v;
  }

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  get ngModel(): DateTime | null {
    return this._ngModel;
  }

  set ngModel(v: DateTime | null) {
    if (v != null && !DateTime.isDateTime(v)) {
      throw new Error('Value is not a DateTime');
    }
    this._ngModel = v;
    this.timeControl.setValue(v?.toFormat('HH:mm') ?? '');
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
      this.ngControl.control.setValidators(this.validate as ValidatorFn);
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

    let seconds = this.defaultTime;
    if (this.timeControl.value) {
      seconds = DateTime.fromFormat(this.timeControl.value, 'HH:mm').diff(DateTime.now().startOf('day')).as('second');
    }

    console.log(this.dateControl.value);
    this._ngModel = this.dateControl.value ? this.dateControl.value.startOf('day').plus({seconds}) : null;
    this.ngModelChange.emit(this._ngModel);
    this.dateChange.emit(this._ngModel);
  }

  validate = (c: FormControl): ValidationErrors | null => {
    if (this._min != null && this._ngModel != null && this._ngModel < this._min) {
      return {min: this._min};
    } else if (this._max != null && this._ngModel != null && this._ngModel > this._max) {
      return {max: this._max};
    }

    return null;
  }
}
