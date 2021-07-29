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
      } else {
        const invalidCheckbox = this.el.nativeElement.querySelector('mat-checkbox.ng-invalid input');
        if (invalidCheckbox) {
          invalidCheckbox.focus();
        }
      }
    }, 100);
  }
}
