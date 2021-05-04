import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ScrollHereModule} from 'scroll-here';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {BootstrapConfirmModule} from 'bootstrap-confirm';

@NgModule({
  declarations: [
    AppComponent
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

    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
