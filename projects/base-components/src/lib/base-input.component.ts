import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {
  booleanAttribute,
  Directive,
  DoCheck,
  ElementRef,
  inject,
  Input,
  OnInit,
  output,
  ViewChild,
} from '@angular/core';
import {ControlValueAccessor, FormControl, NgControl, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatFormFieldControl} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {Subject} from 'rxjs';

@Directive()
export class BaseInputComponent<T> implements OnInit, DoCheck, ControlValueAccessor, MatFormFieldControl<T> {
  static nextId = 0;

  @ViewChild('matinput', {static: false}) input?: ElementRef;

  @ViewChild('matinput', {static: false, read: MatInput}) matInput?: MatInput;

  readonly selectionChange = output<T>();

  ngControl = inject(NgControl, {optional: true, self: true});

  errorState!: boolean;

  stateChanges = new Subject<void>();

  describedBy = '';

  protected _placeholder!: string;

  protected _required = false;

  protected _disabled = false;

  protected _id = `base-input-${BaseInputComponent.nextId++}`;

  protected _parentForm? = inject(NgForm, {optional: true});

  protected _defaultErrorStateMatcher = inject(ErrorStateMatcher);

  #value!: T;

  @Input()
  set value(v: T) {
    this.#value = v;
    this.onChange(v);
    this.stateChanges.next();
  }

  get value(): T {
    return this.#value;
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
    return this._required;
  }

  @Input({transform: booleanAttribute})
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges?.next();
  }

  get disabled(): boolean {
    return this._disabled;
  }

  @Input()
  set id(v: string) {
    this._id = v;
  }

  get id(): string {
    return this._id;
  }

  get empty(): boolean {
    return !this.#value;
  }

  get focused(): boolean {
    return !!this.input && document.activeElement === this.input.nativeElement;
  }

  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  constructor() {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    if (this.matInput) {
      this.stateChanges = this.matInput.stateChanges;
    }
    this.stateChanges.next();
  }

  ngDoCheck(): void {
    if (this.ngControl) {
      this.updateErrorState();
    }
  }

  updateErrorState(): void {
    if (this._parentForm && this._defaultErrorStateMatcher) {
      const oldState = this.errorState;
      const parent = this._parentForm;
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
    this.input?.nativeElement.focus();
  }

  onChange = (value: any): any => {};

  onTouched = (): any => {};

  writeValue(value: T): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
