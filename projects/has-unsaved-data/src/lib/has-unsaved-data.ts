import {Directive, HostListener, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class ComponentCanDeactivate {

  @ViewChild('form', {static: false}) form?: NgForm;

  hasUnsavedData(): boolean {
    return !!this.form?.dirty;
  }

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.hasUnsavedData()) {
      $event.returnValue = true;
    }
  }
}
