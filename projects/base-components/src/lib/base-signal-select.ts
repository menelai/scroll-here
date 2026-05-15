import {booleanAttribute, Directive, DoCheck, input, OnDestroy, OnInit, output, viewChild} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';
import {MatFormFieldControl} from '@angular/material/form-field';
import {MatSelect} from '@angular/material/select';

import {BaseSignalInput} from './base-signal-input';

@Directive()
export class BaseSignalSelect<T>
  extends BaseSignalInput<T>
  implements OnInit, DoCheck, OnDestroy, ControlValueAccessor, MatFormFieldControl<T> {
  static override nextId = 0;

  readonly select = viewChild(MatSelect);

  readonly multiple = input(false, {transform: booleanAttribute});

  readonly selectionChange = output<T>();

  protected override _id = `base-select-${BaseSignalSelect.nextId++}`;

  override get empty(): boolean {
    const v = this.val();
    return v == null || Array.isArray(v) && v.length === 0;
  }

  override get focused(): boolean {
    return !!this.select()?.panelOpen;
  }

  override update(value: T): void {
    if (this.multiple() && Array.isArray(value) && value.length === 0) {
      value = null as any;
    }

    super.update(value);
    this.selectionChange.emit(value);
  }

  override onContainerClick(event: MouseEvent): void {
    if (!(event.target as any).closest('mat-form-field').querySelector('.cdk-overlay-pane')) {
      this.select()?.focus();
      this.select()?.open();
    }
  }
}
