# DragScroll

## Installation

```
npm install @kovalenko/drag-scroll
```

First, import the DragScrollModule to your module:

```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {DragScrollModule} from '@kovalenko/drag-scroll';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppComponent} from './app';

@NgModule({
  imports: [
    BrowserModule,
    DragScrollModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
```

Then use the directive to scroll element by dragging it:

```typescript
import {Component} from '@angular/core';
import {MainMenuService} from '@kovalenko/main-menu';

@Component({
  selector: 'app',
  template: `
    <div style="overflow-x: auto; width: 300px" [dragScroll]="condition">
      <div style="width: 3000px;">long contents</div>
    </div>
  `,
})
export class AppComponent {
  condition = true;
}
```

### Directive

Selector: `[dragScroll]`

#### Properties

Name | Description
--- | ---
`@Input() dragScroll: boolean` | determines whether drag scroll or not

## License

MIT
