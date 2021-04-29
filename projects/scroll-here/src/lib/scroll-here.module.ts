import { NgModule } from '@angular/core';
import { ScrollHereDirective } from './scroll-here.directive';
import {NgxPageScrollCoreModule} from 'ngx-page-scroll-core';

@NgModule({
  declarations: [
    ScrollHereDirective
  ],
  imports: [
    NgxPageScrollCoreModule,
  ],
  exports: [
    ScrollHereDirective
  ]
})
export class ScrollHereModule { }
