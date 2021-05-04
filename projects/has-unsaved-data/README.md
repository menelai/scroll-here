# HasUnsavedData

Provides a router guard preventing route deactivation, if the component has dirty form

## Installation

```
npm install @kovalenko/has-unsaved-data
```

First, import the ScrollHereModule to your module:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HasUnsavedDataModule } from '@kovalenko/has-unsaved-data';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app';

@NgModule({
  imports: [BrowserModule, HasUnsavedDataModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
```

Then, import HasUnsavedDataGuard to your routing module:

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfilePageComponent} from './profile-page/profile-page.component';
import {HasUnsavedDataGuard} from '@kovalenko/has-unsaved-data';


const routes: Routes = [
  {
    path: 'profile',
    component: ProfilePageComponent,
    canDeactivate: [HasUnsavedDataGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
```

Finally, extend your component from ComponentCanDeactivate:

```typescript
@Component({
  selector: 'app',
  template: `
    <form #form="ngForm">
    </form>
  `,
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent extends ComponentCanDeactivate {
  // ...
}
```

Note: the component must have one form tag exported to #form="ngForm"

## License

MIT
