import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {booleanAttribute, Directive, DoCheck, inject, Input, OnDestroy, OnInit, signal} from '@angular/core';
import {ControlValueAccessor, NgControl} from '@angular/forms';
import {_ErrorStateTracker, ErrorStateMatcher} from '@angular/material/core';
import {MatFormFieldControl} from '@angular/material/form-field';
import {Subject} from 'rxjs';

@Directive()
export class BaseSignalInput<T> implements OnInit, DoCheck, OnDestroy, ControlValueAccessor, MatFormFieldControl<T> {
  static nextId = 0;

  readonly val = signal<T | null>(null);

  readonly ngControl = inject(NgControl, {optional: true, self: true});

  readonly stateChanges = new Subject<void>();

  readonly describedBy = signal('');

  readonly _disabled = signal(false);

  readonly _placeholder = signal('');

  protected _required = false;

  protected _id = `base-input-${BaseSignalInput.nextId++}`;

  readonly #errorStateTracker = new _ErrorStateTracker(
    inject(ErrorStateMatcher),
    this.ngControl,
    null,
    null,
    this.stateChanges,
  );

  @Input()
  set value(v: T | null) {
    this.val.set(v);
    this.stateChanges.next();
  }

  get value(): T | null {
    return this.val();
  }

  @Input()
  set placeholder(value: string) {
    this._placeholder.set(value);
    this.stateChanges.next();
  }

  get placeholder(): string {
    return this._placeholder();
  }

  @Input({transform: booleanAttribute})
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  get required(): boolean {
    return this._required;
  }

  @Input({transform: booleanAttribute})
  set disabled(value: boolean) {
    this._disabled.set(coerceBooleanProperty(value));
    this.stateChanges.next();
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
    return !this.val();
  }

  get focused(): boolean {
    return false;
  }

  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  get errorState(): boolean {
    return this.#errorStateTracker.errorState;
  }

  constructor() {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.stateChanges.next();
  }

  ngDoCheck(): void {
    this.#errorStateTracker.updateErrorState();
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
  }

  update(value: T): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  setDescribedByIds(ids: string[]): void {
    this.describedBy.set(ids.join(' '));
  }

  onContainerClick(event: MouseEvent): void {

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
