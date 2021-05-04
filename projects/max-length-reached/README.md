# MaxLengthReached

Emits an event if input's max length reached

## Usage

First, import the MaxLengthReachedModule to your module:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ScrollHereModule } from '@kovalenko/max-length-reached';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app';

@NgModule({
  imports: [BrowserModule, MaxLengthReachedModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
```

In this example, the second input will be focused when the first input will reach max length  

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <input type="text" maxlangth="5" (ngcMaxLengthReached)="second.nativeElement.focus()">
    <input type="text" #second>
  `,
})
export class AppComponent {
}
```

## License

MIT
