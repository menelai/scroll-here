import { MatFormFieldControl } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import {ControlValueAccessor, FormControl, NgControl, NgForm} from '@angular/forms';
import {Directive, DoCheck, EventEmitter, inject, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {ErrorStateMatcher} from '@angular/material/core';

@Directive()
export class BaseSelectComponent<T> implements OnInit, DoCheck, ControlValueAccessor, MatFormFieldControl<T>, OnDestroy {
  @ViewChild('matinput', {static: true}) select!: MatSelect;
  @Output() ngModelChange = new EventEmitter<T>();
  @Output() selectionChange = new EventEmitter<T>();
  @Output() readonly valueChange: EventEmitter<T> = new EventEmitter<T>();

  ngControl = inject(NgControl, {optional: true, self: true});

  errorState!: boolean;

  stateChanges = new Subject<void>();

  protected _placeholder!: string;
  protected _required = false;
  protected _disabled = false;
  protected _type!: string;
  protected _id!: string;
  protected _ngModel!: T;

  protected _parentForm = inject(NgForm, {optional: true});
  protected _defaultErrorStateMatcher = inject(ErrorStateMatcher);

  constructor() {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {}

  ngDoCheck() {
    if (this.ngControl) {
      this.updateErrorState();
    }
  }

  updateErrorState() {
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

  get shouldLabelFloat() {
    return this.select.panelOpen || !this.empty;
  }

  setDescribedByIds(ids: string[]): void {
  }

  get empty() {
    return !this._ngModel || Array.isArray(this._ngModel) && this._ngModel.length === 0;
  }

  get focused() {
    return this.select.focused;
  }

  @Input()
  get placeholder(): string { return this._placeholder; }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  onContainerClick(event: MouseEvent): void {
    this.select.focus();
    this.select.open();
  }

  @Input() set id(v: string) {
    this._id = v;
  }
  get id(): string {
    return this._id;
  }

  @Input() get ngModel(): T {
    return this._ngModel;
  }
  set ngModel(v: T) {
    this._ngModel = v;
    this.ngModelChange.emit(v);
  }

  @Input()
  get value(): T {
    return this._ngModel;
  }
  set value(v: T) {
    this._ngModel = v;
  }


  onChange: any = () => {};
  onTouched: any = () => {};

  ngOnDestroy() {
  }

  writeValue(value: string): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  trackByIndex(index: any) {
    return index;
  }

  onSelectionChange(event?: any) {
    this.onTouched();
  }
}
