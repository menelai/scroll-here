import { NgModule } from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ScrollHereModule} from 'scroll-here';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {BootstrapConfirmModule} from 'bootstrap-confirm';
import {MainMenuModule} from 'main-menu';
import {MainMenuTitleService} from 'main-menu';
import {RouterModule} from '@angular/router';
import { R1Component } from './r1/r1.component';
import { R2Component } from './r2/r2.component';
import {NgFingerprintModule} from 'ng-fingerprint';
import {NgFingerprintService} from 'ng-fingerprint';
import {ColorPickerModule} from 'color-picker';
import {HasUnsavedDataModule} from 'has-unsaved-data';

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
    BootstrapConfirmModule.config({
      ok: 'Окау',
      cancel: 'Отметить'
    }),
    BrowserModule,
    ScrollHereModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HasUnsavedDataModule,
    ColorPickerModule,
    NgFingerprintModule.config([
      'cpuClass',
      'deviceMemory',
      'hardwareConcurrency',
      'osCpu',
      'platform',
      'vendor'
    ]),
    MatFormFieldModule,
    MainMenuModule/*.config({
      provide: MainMenuTitleService,
      useClass: Joj
    })*/,
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
  constructor(private ngFingerprintService: NgFingerprintService) {
    ngFingerprintService.fingerprint$.subscribe(console.log);
  }
}
