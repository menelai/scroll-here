import { HostBinding, OnDestroy, Directive } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {AppInjector} from '@shared/services/injector.service';
import {MediaService} from '@shared/services/media.service';
import { PermissionName } from '@interfaces';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export class BaseListComponent implements OnDestroy {
  PermissionName = PermissionName;
  @HostBinding('class.host') true = true;
  expanded: boolean;
  isHandset: boolean;
  name: string;

  public media: MediaService;
  protected router: Router;

  constructor() {
    const injector = AppInjector.getInjector();
    this.media = injector.get(MediaService);
    this.router = injector.get(Router);

    this.router.events.pipe(
      filter(v => v instanceof NavigationEnd)
    ).subscribe(($routeEvents: any) => {
      let route = this.router.routerState.root;
      while (route.firstChild) {
        route = route.firstChild;
      }
      this.expanded = $routeEvents.url === (route.snapshot as any)._routerState.url && Object.getPrototypeOf(route.component) === Object.getPrototypeOf(this.constructor);
    });
  }

  trackByIndex(index: any): any {
    return index;
  }

  ngOnDestroy() {}

}
