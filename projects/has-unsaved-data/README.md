# HasUnsavedData

Provides a router guard preventing route deactivation, 
if the component\`s method decorated with `@CheckUnsavedData()` returns `true`.
Also it prevents the window to be unloaded.

## Installation

```
npm i @kovalenko/has-unsaved-data
```

First, import the `HasUnsavedDataModule` to your module:

```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HasUnsavedDataModule, HasUnsavedDataConfirmService, UnsavedDataConfig, UNSAVED_DATA_CONFIG} from '@kovalenko/has-unsaved-data';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppComponent} from './app';

@NgModule({
  imports: [
    BrowserModule,
    HasUnsavedDataModule.config({
      confirmService: {
        provide: HasUnsavedDataConfirmService,
        useExisting: ConfirmService, // your favorite confirm service 
      },
      title: 'Default confirm title', // optional
      message: 'Default message', // optional
      ok: 'Default ok button', // optional
      cancel: 'Default cancel button', // optional
    })
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
  // Optionally change default UnsavedDataConfig in runtime
  constructor(
    @Inject(UNSAVED_DATA_CONFIG) private config: UnsavedDataConfig
  ) {
    setTimeout(() => {
      config.cancel = 'CANCEL';
      config.ok = 'OKAY';
    }, 1000);
  }
}

platformBrowserDynamic().bootstrapModule(AppModule);
```

Then, import `HasUnsavedDataGuard` to your routing module:

```typescript
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProfilePageComponent} from './profile-page/profile-page.component';
import {hasUnsavedDataGuard} from '@kovalenko/has-unsaved-data';


const routes: Routes = [
  {
    path: 'profile',
    component: ProfilePageComponent,
    canDeactivate: [hasUnsavedDataGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
```

Finally, decorate your component\`s method with `@CheckUnsavedData()`:

```typescript
import {CheckUnsavedData} from '@kovalenko/has-unsaved-data';
import {ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app',
  template: `
    <form #form="ngForm">
    </form>
  `,
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  @ViewChild('form') form: NgForm;

  @CheckUnsavedData()
  hasUnsavedData(): boolean {
    return this.form.dirty;
  }
}
```

Optionally override defaults:

```typescript
import {CheckUnsavedData} from '@kovalenko/has-unsaved-data';
import {ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app',
  template: `
    <form #form="ngForm">
    </form>
  `,
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  @ViewChild('form') form: NgForm;

  constructor(private translate: TranslateService) { }

  @CheckUnsavedData<ProfilePageComponent>(o => ({
    message: o.translate.instant('Custom confirmation message')
  }))
  hasUnsavedData(): boolean {
    return this.form.dirty;
  }

}
```

## License

MIT
