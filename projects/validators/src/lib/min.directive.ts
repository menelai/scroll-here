import {Directive, ElementRef, Input} from '@angular/core';
import { FormControl, NG_VALIDATORS } from '@angular/forms';


@Directive({
  selector: '[ngcMin]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MinDirective,
    multi: true
  }]
})
export class MinDirective {
  private val!: number;
  private onChange!: () => void;

  constructor(private elRef: ElementRef) {
  }

  @Input() get ngcMin(): number {
    return this.val;
  }

  set ngcMin(v: number) {
    this.val = v;
    this.elRef.nativeElement.setAttribute('min', v);
    if (this.onChange) {
      this.onChange();
    }
  }

  validate(c: FormControl): {[key: string]: any} | null {
    const v = c.value;
    return (this.val != null && v < this.val) ? {ngcMin: true} : null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onChange = fn;
  }
}
