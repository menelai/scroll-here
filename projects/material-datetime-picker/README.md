# MaterialDatetimePicker

Material datetime picker

## Installation

```
npm install @kovalenko/material-datetime-picker
```

### DatetimePicker

Selector: `ngc-datetime-picker`

Пикер даты и времени. MatFormFieldControl

Title | Description
--- | ---
`@Input() ngModel: Moment` | Date
`@Input() min: Moment` | Min date
`@Input() max: Moment` | Max date
`@Input() hasTimePicker: boolean` | Time input
`@Input() defaultTime: number` | Default time offset in seconds
`@Output() ngModelChange: EventEmitter<Moment>` | ngModel change
`@Output() dateChange: EventEmitter<Moment>` | User date change


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
