# SwipeSidenav

Adds swipe functionality to material sidenav or drawer

## Installation

```
npm install @kovalenko/swipe-sidenav
```

## Usage

Extend your component from `SwipeableSidenav`. In template, add `#drawer` export to sidenav or drawer and `[@.disabled]="disableAnimation"` to the container.

```typescript
import {Component} from '@angular/core';
import {SwipeableSidenav} from '@kovalenko/swipe-sidenav';

@Component({
  selector: 'app',
  template: `
    <mat-drawer-container [@.disabled]="disableAnimation">
      <mat-drawer #drawer>mat-drawer-content</mat-drawer>
    </mat-drawer-container>
  `,
})
export class AppComponent extends SwipeableSidenav {
  constructor() {
    super();
  }

}
```

## License

MIT
