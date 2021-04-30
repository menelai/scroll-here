# MaterialDatetimePicker

Material datetime picker

## Installation

```
npm install @kovalenko/material-datetime-picker
```

### DatetimePicker

Selector: `ngc-datetime-picker`

Пикер даты и времени. MatFormFieldControl

Наименование | Описание
--- | ---
`@Input() ngModel: Moment` | Дата
`@Input() min: Moment` | Минимальная дата
`@Input() max: Moment` | Максимальная дата
`@Input() hasTimePicker: boolean` | Флаг инпута времени
`@Output() ngModelChange: EventEmitter<Moment>` | Изменение ngModel
`@Output() dateChange: EventEmitter<Moment>` | Изменение даты пользователем


## Usage

First, import the MaterialDatetimePickerModule to your module:

```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialDatetimePickerModule} from '@kovalenko/material-datetime-picker';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppComponent} from './app';

@NgModule({
  imports: [
    BrowserModule,
    MaterialDatetimePickerModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
```

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <form>
      <mat-form-field>
        <ngc-datetime-picker placeholder="Date" [(ngModel)]="date" [hasTimePicker]="true" name="date"></ngc-datetime-picker>
      </mat-form-field>
    </form>
  `,
})
export class AppComponent {
  date = moment();

}
```
