import {Inject, NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MaterialConfirmModule} from 'material-confirm';
import {RouterModule} from '@angular/router';
import { R1Component } from './r1/r1.component';
import { R2Component } from './r2/r2.component';
import {ColorPickerModule} from 'color-picker';
import {HasUnsavedDataGuard, HasUnsavedDataModule} from 'has-unsaved-data';
import {HasUnsavedDataConfirmService} from 'has-unsaved-data';
import {ConfirmService} from 'material-confirm';
import {unsavedDataConfig} from 'has-unsaved-data';
import {UnsavedDataConfig} from 'has-unsaved-data';
import {
  MaterialDatetimePickerModule
} from 'material-datetime-picker';

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
    MaterialDatetimePickerModule,
    MaterialConfirmModule.config({
      ok: 'Окау',
      cancel: 'Отметить'
    }),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HasUnsavedDataModule.config({
      confirmService: {
        provide: HasUnsavedDataConfirmService,
        useExisting: ConfirmService,
      },
    }),
    ColorPickerModule,
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
        canDeactivate: [HasUnsavedDataGuard],
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
    @Inject(unsavedDataConfig) private config: UnsavedDataConfig
  ) {
    setTimeout(() => {
      config.cancel = 'JOPA';
      config.ok = 'OKAY';
      console.log('rea');
    }, 1000);
  }
}
