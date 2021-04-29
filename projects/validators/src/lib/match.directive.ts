import {Directive, Input} from '@angular/core';
import {FormControl, NG_VALIDATORS, Validator} from '@angular/forms';

@Directive({
  selector: '[ngcMatch]',
  providers: [{provide: NG_VALIDATORS, useExisting: MatchDirective, multi: true}]
})
export class MatchDirective implements Validator {
  private val!: any;
  private onChange!: () => void;

  constructor() { }

  @Input() get ngcMatch(): any {
    return this.val;
  }
  set ngcMatch(v: any) {
    this.val = v;
    if (this.onChange) {
      this.onChange();
    }
  }

  validate(c: FormControl): {[key: string]: any} | null {
    const v = c.value;
    return ( v && v !== this.ngcMatch) ? {ngcMatch: true} : null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onChange = fn;
  }
}
