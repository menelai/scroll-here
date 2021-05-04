import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[ngcMaxLengthReached]'
})
export class MaxLengthReachedDirective {

  @Output() ngcMaxLengthReached = new EventEmitter();

  constructor(private _el: ElementRef) { }

  @HostListener('keyup', ['$event']) onKeyDown(e: any) {
    if (this._el.nativeElement.maxLength === this._el.nativeElement.value.length) {
      e.preventDefault();
      this.ngcMaxLengthReached.emit();
    }
  }

}
