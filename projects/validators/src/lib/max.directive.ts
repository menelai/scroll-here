import {Directive, ElementRef, Input} from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator } from '@angular/forms';


@Directive({
  selector: '[ngcMax]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MaxDirective,
    multi: true
  }]
})
export class MaxDirective implements Validator {
  private val!: number;
  private onChange!: () => void;

  constructor(private elRef: ElementRef) {
  }

  @Input() get ngcMax(): number {
    return this.val;
  }

  set ngcMax(v: number) {
    this.val = v;
    this.elRef.nativeElement.setAttribute('max', v);
    if (this.onChange) {
      this.onChange();
    }
  }

  validate(c: FormControl): {[key: string]: any} | null {
    const v = c.value;
    return (this.val != null && v > this.val) ? {ngcMax: true} : null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onChange = fn;
  }
}
