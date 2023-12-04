import {Inject, NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { R1Component } from './r1/r1.component';
import { R2Component } from './r2/r2.component';
import {HasUnsavedDataConfirmService, hasUnsavedDataGuard, HasUnsavedDataModule} from 'has-unsaved-data';
import {ConfirmService, MaterialConfirmModule} from '@kovalenko/material-confirm';
import { MaterialDatetimePickerModule } from 'material-datetime-picker';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';


class Joj {
  setTitle(title: string) {
    console.log(title);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    R1Component,
    R2Component
  ],
  imports: [
    TranslateModule.forRoot(),
    MaterialConfirmModule.config({
      width: '520px',
      panelClass: ['confirm-dialog-container'],
      disableClose: true,
      ok: 'Ok',
      cancel: 'Cancel',
      position: {
        top: '10px',
      },
    }),
    HasUnsavedDataModule.config({
      confirmService: {
        provide: HasUnsavedDataConfirmService,
        useExisting: ConfirmService,
      },
    }),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialDatetimePickerModule,
    MatFormFieldModule,
    RouterModule.forRoot([
      {
        path: '',
        component: R1Component,
        data: {
          title: 'R1'
        }
      },
      {
        path: 'r2',
        component: R2Component,
        canDeactivate: [hasUnsavedDataGuard],
        data: {
          title: 'joj'
        }
      },
    ])
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private translate: TranslateService,
  ) {
    translate.onLangChange.subscribe(lang => {
      console.log(lang, '!!!!');
    });

    this.translate.use('en');

    setTimeout(() => {
      this.translate.use('ru');
    }, 2000);

  }
}
