import { NgModule } from '@angular/core';
import {PrintElementDirective} from './print-element.directive';

@NgModule({
  declarations: [
    PrintElementDirective
  ],
  exports: [
    PrintElementDirective
  ]
})
export class PrintElementModule { }
