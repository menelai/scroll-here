import { NgModule } from '@angular/core';
import {TranslatableTitleService} from './translatable-title.service';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
  ],
  imports: [
    TranslateModule,
  ],
  exports: [
  ],
  providers: [
    TranslatableTitleService
  ]
})
export class TranslatableTitleModule { }
