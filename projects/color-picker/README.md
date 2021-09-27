# MaterialColorPicker

Material color picker

## Installation

```
npm install @kovalenko/material-color-picker
```

### ColorPicker

Selector: `ngc-color-picker`

Color picker. MatFormFieldControl

Title | Description
--- | ---
`@Input() ngModel: string` | Color
`@Output() ngModelChange: EventEmitter<string>` | ngModel change


## Usage

First, import the ColorPickerModule to your module:

```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ColorPickerModule} from '@kovalenko/material-color-picker';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppComponent} from './app';

@NgModule({
  imports: [
    BrowserModule,
    ColorPickerModule
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
        <ngc-color-picker placeholder="Color" [(ngModel)]="color" name="color"></ngc-datetime-picker>
      </mat-form-field>
    </form>
  `,
})
export class AppComponent {
  date = '#ff0000';

}
```

## License

MIT
