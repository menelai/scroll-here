import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[focusInvalidInput]'
})
export class FocusInvalidInputDirective {

  constructor(private el: ElementRef) { }

  @HostListener('ngSubmit') onFormSubmit() {
    setTimeout(() => {
      const invalidControl = this.el.nativeElement.querySelector('mat-form-field.ng-invalid input.ng-invalid');
      if (invalidControl) {
        invalidControl.click();
      }
    }, 100);
  }
}
