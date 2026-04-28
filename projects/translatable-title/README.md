# TranslatableTitle

Translates the title and watches language change

## Installation

```
npm install @kovalenko/translatable-title
```

Inject TranslatableTitleService into your component:

```typescript
import {Component, inject} from '@angular/core';
import {TranslatableTitleService} from '@kovalenko/translatable-title';

@Component({
  selector: 'app',
  template: ``,
})
export class AppComponent {
  readonly #translatableTitleService = inject(TranslatableTitleService);
  
  constructor() {
    this.#translatableTitleService.setTitle('Title');
  }
}
```


## License

MIT
