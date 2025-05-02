import {NgClass} from '@angular/common';
import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, ReactiveFormsModule, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';
import {MatIconButton} from '@angular/material/button';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker, MatDatepickerInput} from '@angular/material/datepicker';
import {MatFormFieldControl, MatSuffix} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatInput} from '@angular/material/input';
import {BaseInputComponent} from '@kovalenko/base-components';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import moment, {isMoment, Moment} from 'moment';

@Component({
  selector: 'ngc-datetime-picker',
  templateUrl: './moment-datetime-picker.component.html',
  styleUrls: ['./moment-datetime-picker.component.scss'],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'en',
    },
    provideMomentDateAdapter(),
    {
      provide: MAT_DATE_FORMATS, useValue: {
        parse: {
          dateInput: 'DD.MM.YYYY',
        },
        display: {
          dateInput: 'DD.MM.YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'DD.MM.YYYY',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
    {
      provide: MatFormFieldControl,
      useExisting: MomentDatetimePickerComponent,
    },
  ],
  imports: [
    MatDatepicker,
    MatDatepickerInput,
    MatIcon,
    MatIconButton,
    MatInput,
    MatSuffix,
    NgClass,
    ReactiveFormsModule,
  ],
})
export class MomentDatetimePickerComponent extends BaseInputComponent<Moment | null> implements Validator, OnInit, AfterViewInit, OnDestroy {
  @ViewChild('timeinput') timeinput: any;

  @Input() hasTimePicker = false;

  @Input() defaultTime = 0;

  @Output() dateChange = new EventEmitter<Moment | null>();

  readonly hourCycle = ['AM', 'PM']
    .includes((new Date(64_800_000)).toLocaleTimeString().slice(-2).toUpperCase())
    ? 'h12'
    : 'h24';

  dateControl = new FormControl<Moment | null>(null);

  timeControl = new FormControl();

  private _min!: Moment | null;

  private langSubs?: Subscription;

  private _max!: Moment | null;

  @Input()
  set min(v: Moment | null) {
    this._min = v;
  }

  get min(): Moment | null {
    return this._min;
  }

  @Input()
  set max(v: Moment | null) {
    this._max = v;
  }

  get max(): Moment | null {
    return this._max;
  }

  @Input()
  override set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  override get placeholder(): string {
    return this._placeholder;
  }

  override set ngModel(v: Moment | null) {
    if (v != null && !isMoment(v)) {
      v = moment(v);
    }
    this._ngModel = v;
    this.timeControl.setValue(v?.format('HH:mm') ?? '');
    this.dateControl.setValue(v);
  }

  override get ngModel(): Moment | null {
    return this._ngModel;
  }

  override get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  override get focused(): boolean {
    return document.activeElement === this.input.nativeElement
      || this.timeinput != null && document.activeElement === this.timeinput.nativeElement;
  }

  constructor(
    private dateAdapter: DateAdapter<Moment>,
    private translate: TranslateService,
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.dateAdapter.setLocale(this.translate.currentLang);
    this.langSubs = this.translate.onLangChange.subscribe(lang => {
      this.dateAdapter.setLocale(lang.lang);
    });
  }

  ngAfterViewInit(): void {
    if (this.ngControl && this.ngControl.control) {
      this.ngControl.control.setValidators(this.validate as ValidatorFn);
    }
    this.onDisabledChange(this.disabled);
  }

  override ngOnDestroy(): void {
    this.langSubs?.unsubscribe();
  }

  openCalendar(picker: MatDatepicker<any>): void {
    picker.open();
    setTimeout(() => this.input.nativeElement.focus());
  }

  closeCalendar(): void {
    this.onTouched();
    setTimeout(() => this.input.nativeElement.blur());
  }

  override onContainerClick(event: MouseEvent): void {
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
      seconds = moment(this.timeControl.value, 'HH:mm').diff(moment().startOf('day'), 's');
    }

    this._ngModel = this.dateControl.value && moment(this.dateControl.value).startOf('day').add(seconds, 's') || null;

    this.ngModelChange.emit(this._ngModel);
    this.dateChange.emit(this._ngModel);
  }

  validate = (): ValidationErrors | null => {
    if (this._min != null && this._ngModel != null && this._ngModel < this._min) {
      return {min: this._min};
    } else if (this._max != null && this._ngModel != null && this._ngModel > this._max) {
      return {max: this._max};
    }

    return null;
  };

  protected onDisabledChange(v: boolean): void {
    if (v) {
      this.timeControl?.disable();
      this.dateControl?.disable();
    } else {
      this.timeControl?.enable();
      this.dateControl?.enable();
    }
  }
}
