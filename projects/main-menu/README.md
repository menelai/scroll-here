# @kovalenko/main-menu

An Angular service that automatically builds a hierarchical menu tree from your router configuration and keeps the page title in sync on every navigation.

## Installation

```bash
npm install @kovalenko/main-menu
```

## How it works

`MainMenuService` reads `Router.config` on startup and walks the route tree. A route is included in the menu when its `data` object contains a `title` field. Routes with dynamic segments (`:param`) or optional segments (`?`) are excluded automatically.

On every `ActivationEnd` event the service also updates the browser/app title using the deepest active route's `pageTitle` (or `title` if `pageTitle` is absent).

## Route data fields

| Field | Type | Description |
|---|---|---|
| `title` | `string` | Menu item label. Required for a route to appear in the menu. |
| `pageTitle` | `string` | Page title set on navigation. Falls back to `title` when omitted. |
| `access` | `T` | Arbitrary access descriptor attached to the menu item (e.g. permission strings). Defaults to `false` when not provided. |
| `queryParams` | `Record<string, any>` | Query parameters stored on the menu item. |
| `children` | `Routes` | Alternative to the standard `children` key — lets you attach child routes via `data` instead. |

## Basic usage

Add `title` to the route data to include a route in the menu:

```typescript
// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Dashboard' },
  },
  {
    path: 'reports',
    component: ReportsComponent,
    data: {
      title: 'Reports',         // menu label
      pageTitle: 'My Reports',  // browser tab title
      access: ['reports.read'],
    },
    children: [
      {
        path: 'monthly',
        component: MonthlyComponent,
        data: { title: 'Monthly' },
      },
    ],
  },
  {
    // no `title` → not included in the menu, but still sets the page title
    path: 'profile',
    component: ProfileComponent,
    data: { pageTitle: 'My Profile' },
  },
  {
    // dynamic segment → excluded from the menu automatically
    path: 'users/:id',
    component: UserComponent,
  },
];
```

Inject `MainMenuService` where you need the menu:

```typescript
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MainMenuService } from '@kovalenko/main-menu';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  template: `
    @for (item of menu.items; track item.id) {
      <a [routerLink]="item.routerLink" [queryParams]="item.queryParams">
        {{ item.name }}
      </a>

      @if (item.children) {
        @for (child of item.children; track child.id) {
          <a [routerLink]="child.routerLink">{{ child.name }}</a>
        }
      }
    }
  `,
})
export class NavComponent {
  readonly menu = inject(MainMenuService);
}
```

## Custom title service

By default the service uses Angular's built-in `Title`. To plug in your own implementation — for example, to translate titles or integrate with a third-party analytics library — extend `MainMenuTitleService` and provide it at the root level:

```typescript
import { Injectable, Provider } from '@angular/core';
import { MainMenuTitleService } from '@kovalenko/main-menu';

@Injectable()
export class AppTitleService extends MainMenuTitleService {
  setTitle(title: string): void {
    document.title = `My App — ${title}`;
  }
}

// In your app config or providers array:
export const appConfig: ApplicationConfig = {
  providers: [
    { provide: MainMenuTitleService, useClass: AppTitleService },
  ],
};
```

When `MainMenuTitleService` is provided, it takes precedence over the default `Title` service.

## `MainMenuItem` interface

Each item in `MainMenuService.items` (and nested `children` arrays) conforms to:

```typescript
interface MainMenuItem<T = any> {
  id: string;                        // random unique identifier
  name: string;                      // from route data.title
  href?: string;                     // external link (set manually if needed)
  target?: string;                   // link target (set manually if needed)
  routerLink?: string[];             // built from the route path
  queryParams?: Record<string, any>; // from route data.queryParams
  access?: T;                        // from route data.access
  children?: MainMenuItem[];         // present when the route has eligible children
}
```

## Access control

`access` is a pass-through field — the library does not evaluate it. Store whatever suits your application (permission strings, roles, boolean flags) and filter items in your template:

```typescript
@for (item of menu.items; track item.id) {
  @if (!item.access || (item.access | hasPermissionPipe)) {
    <a [routerLink]="item.routerLink">{{ item.name }}</a>
  }
}
```

## License

MIT
