# PrintElement

Prints selected element only

## Installation

```
npm install @kovalenko/print-element
```

First, import the PrintElementModule to your module:

```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {PrintElementModule} from '@kovalenko/print-element';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppComponent} from './app';

@NgModule({
  imports: [
    BrowserModule,
    PrintElementModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
```

Then use the directive to print an element:

```typescript
import {Component} from '@angular/core';
import {MainMenuService} from '@kovalenko/main-menu';

@Component({
  selector: 'app',
  template: `
    <button [ngcPrintElement]="printable"></button>
    <div #printable>
      Printable element
    </div>
  `,
})
export class AppComponent { }
```

### Directive

Selector: `[ngcPrintElement]`

#### Properties

Name | Description
--- | ---
`@Input() ngcPrintElement: HTMLElement` | printable element

## License

MIT
