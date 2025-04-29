import {NgClass} from '@angular/common';
import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, ReactiveFormsModule, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';
import {MatIconButton} from '@angular/material/button';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker, MatDatepickerInput} from '@angular/material/datepicker';
import {MatFormFieldControl, MatSuffix} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatInput} from '@angular/material/input';
import {provideLuxonDateAdapter} from '@angular/material-luxon-adapter';
import {BaseInputComponent} from '@kovalenko/base-components';
import {TranslateService} from '@ngx-translate/core';
import {DateTime} from 'luxon';
import {Subscription} from 'rxjs';

@Component({
  selector: 'ngc-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss'],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'en',
    },
    provideLuxonDateAdapter(),
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'DD.MM.yyyy',
        },
        display: {
          dateInput: 'dd.MM.yyyy',
          monthYearLabel: 'MMM yyyy',
          dateA11yLabel: 'DD.MM.yyyy',
          monthYearA11yLabel: 'MMMM yyyy',
        },
      },
    },
    {
      provide: MatFormFieldControl,
      useExisting: DatetimePickerComponent,
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
export class DatetimePickerComponent extends BaseInputComponent<DateTime | null> implements Validator, OnInit, AfterViewInit, OnDestroy {
  @ViewChild('timeinput') timeinput: any;

  @Input() hasTimePicker = false;

  @Input() defaultTime = 0;

  @Output() dateChange = new EventEmitter<DateTime | null>();

  readonly hourCycle = ['AM', 'PM']
    .includes((new Date(64_800_000)).toLocaleTimeString().slice(-2).toUpperCase())
    ? 'h12'
    : 'h24';

  dateControl = new FormControl<DateTime | null>(null);

  timeControl = new FormControl();

  private _min!: DateTime | null;

  private langSubs?: Subscription;

  private _max!: DateTime | null;

  @Input()
  set min(v: DateTime | null) {
    this._min = v;
  }

  get min(): DateTime | null {
    return this._min;
  }

  @Input()
  set max(v: DateTime | null) {
    this._max = v;
  }

  get max(): DateTime | null {
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

  override set ngModel(v: DateTime | null) {
    if (v != null && !DateTime.isDateTime(v)) {
      throw new Error('Value is not a DateTime');
    }
    this._ngModel = v;
    this.timeControl.setValue(v?.toFormat('HH:mm') ?? '');
    this.dateControl.setValue(v);
  }

  override get ngModel(): DateTime | null {
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
    private dateAdapter: DateAdapter<DateTime>,
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
      seconds = DateTime.fromFormat(this.timeControl.value, 'HH:mm')
        .diff(DateTime.now().startOf('day'))
        .as('second');
    }

    this._ngModel = this.dateControl.value
      ? this.dateControl.value.startOf('day').plus({seconds})
      : null;

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
