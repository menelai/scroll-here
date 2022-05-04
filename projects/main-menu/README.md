# MainMenu

Provides a service building the menu tree based on Angular router config. Also it sets the page title on navigation end.

## Installation

```
npm install @kovalenko/main-menu
```

First, import the MainMenuModule to your module:

```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MainMenuModule} from '@kovalenko/main-menu';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppComponent} from './app';

@NgModule({
  imports: [
    BrowserModule,
    MainMenuModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
```

For custom title service, provide it to the module using `config(provider: Provider)` static method:

```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MainMenuModule, MainMenuTitleService} from '@kovalenko/main-menu';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppComponent} from './app';

class MyTitleClass implements MainMenuTitleService {
  setTitle(title: string): void {
    // ...
  }
}

@NgModule({
  imports: [
    BrowserModule,
    MainMenuModule.config({
      provide: MainMenuTitleService,
      useClass: MyTitleClass
    })
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
```

To add routes to main menu, add `title: string` to route data. To set only page title, add `pageTitle: string` to route data. Add both to have different menu item and page titles.
If you add `access: string[]` field to route data, it will be added in main menu items `access` field; otherwise it will be `false`.

```typescript
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'route1',
    component: Route1Component,
    data: {
      title: 'Route 1',
    },
  },
  { // not included to main menu, just sets the page title
    path: 'route2',
    component: Route2Component,
    data: {
      pageTitle: 'Route 2',
    },
  },
  {
    path: 'route3',
    component: Route3Component,
    data: {
      title: 'Route 3 menu title',
      pageTitle: 'Route 3 page title',
      access: ['route3.read']
    },
  },
];
```

Then inject MainMenuService into your component:

```typescript
import {Component} from '@angular/core';
import {MainMenuService} from '@kovalenko/main-menu';

@Component({
  selector: 'app',
  template: `
    <ng-container *ngFor="let item of items">
      <a *ngIf="!item.access || (item.access | yourAccessControlPipe)" [routerLink]="item.routerLink">{{ item.name }}</a>
    </ng-container>
  `,
})
export class AppComponent {
  readonly items = this.mainMenuService.items;
  constructor(private mainMenuService: MainMenuService<string[]>) { }
}
```

## License

MIT
