# TranslatableTitle

Translates the title and watches language change

## Installation

```
npm install @kovalenko/translatable-title
```

First, import the TranslatableTitleModule to your module:

```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MainMenuModule} from '@kovalenko/translatable-title';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppComponent} from './app';

@NgModule({
  imports: [
    BrowserModule,
    TranslatableTitleModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
```

Then inject TranslatableTitleService into your component:

```typescript
import {Component} from '@angular/core';
import {TranslatableTitleService} from '@kovalenko/translatable-title';

@Component({
  selector: 'app',
  template: ``,
})
export class AppComponent {
  readonly items = this.mainMenuService.items;
  constructor(private translatableTitleService: TranslatableTitleService) {
    translatableTitleService.setTitle('Title');
  }
}
```


## License

MIT
