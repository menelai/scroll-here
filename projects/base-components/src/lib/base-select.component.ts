import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {
  booleanAttribute,
  Directive,
  DoCheck,
  EventEmitter,
  inject,
  input,
  Input,
  OnInit,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroupDirective, NgControl, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatFormFieldControl} from '@angular/material/form-field';
import {MatSelect} from '@angular/material/select';
import {Subject} from 'rxjs';

@Directive()
export class BaseSelectComponent<T> implements OnInit, DoCheck, ControlValueAccessor, MatFormFieldControl<T> {
  static nextId = 0;

  @ViewChild(MatSelect, {static: true}) select!: MatSelect;

  @Output() readonly selectionChange = new EventEmitter<T>();

  readonly multiple = input(false, {transform: booleanAttribute});

  readonly _disabled = signal(false);

  ngControl = inject(NgControl, {optional: true, self: true});

  errorState!: boolean;

  stateChanges!: Subject<void>;

  describedBy = '';

  protected _placeholder!: string;

  protected _required!: boolean;

  protected _id = `base-select-${BaseSelectComponent.nextId++}`;

  protected readonly _parentForm = inject(NgForm, {optional: true});

  protected readonly parentFormGroup = inject(FormGroupDirective, {optional: true});

  protected readonly _defaultErrorStateMatcher = inject(ErrorStateMatcher);

  readonly #value = signal<T>(undefined as T);

  @Input()
  set value(v: T) {
    this.#value.set(v);
    this.onChange(v);
    this.stateChanges?.next();
  }

  get value(): T {
    return this.#value();
  }

  @Input()
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges?.next();
  }

  get placeholder(): string {
    return this._placeholder;
  }

  @Input({transform: booleanAttribute})
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges?.next();
  }

  get required(): boolean {
    return this._required ?? this.ngControl?.control?.hasValidator(Validators.required) ?? false;
  }

  @Input({transform: booleanAttribute})
  set disabled(value: boolean) {
    this._disabled.set(coerceBooleanProperty(value));
    this.stateChanges?.next();
  }

  get disabled(): boolean {
    return this._disabled();
  }

  @Input()
  set id(v: string) {
    this._id = v;
  }

  get id(): string {
    return this._id;
  }

  get empty(): boolean {
    const v = this.#value();
    return !v || Array.isArray(v) && v.length === 0;
  }

  get focused(): boolean {
    return this.select.focused;
  }

  get shouldLabelFloat(): boolean {
    return this.select.panelOpen || !this.empty;
  }

  constructor() {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.stateChanges = this.select.stateChanges;
    this.stateChanges.next();
  }

  ngDoCheck(): void {
    if (this.ngControl) {
      this.updateErrorState();
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  updateErrorState(): void {
    if ((this.parentFormGroup || this._parentForm) && this._defaultErrorStateMatcher) {
      const oldState = this.errorState;
      const parent = this._parentForm ?? this.parentFormGroup;
      const matcher = this._defaultErrorStateMatcher;
      const control = this.ngControl ? this.ngControl.control as FormControl : null;
      const newState = matcher.isErrorState(control, parent);

      if (newState !== oldState) {
        this.errorState = newState;
        this.stateChanges.next();
      }
    }
  }

  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent): void {
    this.select.focus();
    this.select.open();
  }

  onChange = (value: any): any => {};

  onTouched = (): any => {};

  writeValue(value: T): void {
    this.#value.set(value);
    this.stateChanges?.next();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
