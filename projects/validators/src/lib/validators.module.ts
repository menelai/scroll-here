import { NgModule } from '@angular/core';
import {MinDirective} from './min.directive';
import {MaxDirective} from './max.directive';
import {MatchDirective} from './match.directive';

@NgModule({
  declarations: [
    MinDirective,
    MaxDirective,
    MatchDirective,
  ],
  imports: [
  ],
  exports: [
    MinDirective,
    MaxDirective,
    MatchDirective,
  ]
})
export class ValidatorsModule { }
