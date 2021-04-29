# Validators

## Installation

```
npm install @kovalenko/validators
```

## Supported API

### Min

Selector: `[ngcMin][type=number]`

Validates input minimal value

Name | Description
--- | ---
`@Input() ngcMin: number` | Minimal value

### Max

Validates input maximal value

Selector: `[ngcMax][type=number]`

Name | Description
--- | ---
`@Input() ngcMax: number` | Maximal value

### Match

Validates whether input value matches specified value

Selector: `[ngcMatch]`

Name | Description
--- | ---
`@Input() ngcMatch: any` | Value to compare with


## Usage

First, import the ValidatorsModule to your module:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ValidatorsModule } from '@menelai/validators';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app';

@NgModule({
  imports: [BrowserModule, ValidatorsModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
```

In this example, errors will be shown when **num** is lower than 0 or greater than 20

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <input type="number" name="num" [(ngModel)]="num" [ngcMin]="0" [ngcMax]="20" #numModel="ngModel">
    <div *ngIf="numModel.hasError('ngcMin')">Invalid min</div>
    <div *ngIf="numModel.hasError('ngcMax')">Invalid max</div>
  `,
})
export class AppComponent {
  num = 10;
}
```

In this example, errors will be shown when pass1 and pass2 do not match

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <input type="password" name="pass1" [(ngModel)]="pass1">
    <input type="password" name="pass2" [(ngModel)]="pass2" [ngcMatch]="pass1" #pass2Model="ngModel">
    <div *ngIf="pass2Model.hasError('ngcMatch')">Passwords mismatch</div>
  `,
})
export class AppComponent {
  pass1: string;
  pass2: string;
}
```

## License

MIT
