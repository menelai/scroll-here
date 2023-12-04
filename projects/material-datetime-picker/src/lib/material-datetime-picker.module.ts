import { NgModule } from '@angular/core';
import {DatetimePickerComponent} from './datetime-picker/datetime-picker.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {A11yModule} from '@angular/cdk/a11y';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [
    DatetimePickerComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    A11yModule,
    CommonModule,
  ],
  exports: [
    DatetimePickerComponent
  ]
})
export class MaterialDatetimePickerModule { }
