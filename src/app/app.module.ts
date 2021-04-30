import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ScrollHereModule} from 'scroll-here';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { MaterialConfirmModule } from 'material-confirm';
import {MaterialDatetimePickerModule} from 'material-datetime-picker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialDatetimePickerModule,
    ScrollHereModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialConfirmModule.config({
      ok: 'Ok',
      cancel: 'Cancel',
      position: {
        top: '10px'
      },
      width: '400px'
    }),
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
