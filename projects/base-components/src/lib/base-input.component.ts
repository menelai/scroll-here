import {Directive, DoCheck, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormControl, NgControl, NgForm} from '@angular/forms';
import { Subject} from 'rxjs';
import { MatFormFieldControl } from '@angular/material/form-field';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {ErrorStateMatcher} from '@angular/material/core';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export class BaseInputComponent<T> implements OnInit, DoCheck, ControlValueAccessor, MatFormFieldControl<T>, OnDestroy {
  @Output() ngModelChange = new EventEmitter<T>();
  ngControl!: NgControl;
  errorState!: boolean;
  protected _onChange!: () => void;

  protected _placeholder!: string;
  protected _required = false;
  protected _disabled = false;
  protected _type!: string;
  protected _id!: string;
  protected _ngModel!: T;

  stateChanges = new Subject<void>();

  @ViewChild('matinput', {static: true}) input!: any;

  constructor(
    protected _parentForm: NgForm,
    protected _defaultErrorStateMatcher: ErrorStateMatcher,
  ) {}

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

  onContainerClick(event: MouseEvent): void {
    this.input.nativeElement.focus();
  }

  setDescribedByIds(ids: string[]): void {
  }

  get empty() {
    return !this._ngModel;
  }

  get focused() {
    return this.input && document.activeElement === this.input.nativeElement;
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
  public get value(): T {
    return this._ngModel;
  }
  public set value(v: T) {
    this._ngModel = v;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: string): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  registerOnValidatorChange(fn: () => void): void {
    this._onChange = fn;
  }

  ngOnDestroy() { }
}
