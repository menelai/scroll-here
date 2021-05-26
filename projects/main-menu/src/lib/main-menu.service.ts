import {Injectable, Optional} from '@angular/core';
import {MainMenuItem} from './main-menu-item';
import {ActivatedRoute, ActivationEnd, Router, Routes} from '@angular/router';
import {filter} from 'rxjs/operators';
import {MainMenuTitleService} from './main-menu-title-service';
import {Title} from '@angular/platform-browser';

@Injectable()
export class MainMenuService {

  public readonly items: MainMenuItem[] = [];
  private titleService = this.title2 || this.title1;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title1: Title,
    @Optional() private title2: MainMenuTitleService,
  ) {
    this._createMenu(this.router.config);

    this._updateTitle();
    this.router.events.pipe(
      filter(event => event instanceof ActivationEnd)
    ).subscribe(event => {
      this._updateTitle();
    });
  }

  private _createMenu(level: Routes, target: MainMenuItem[] = this.items, path: string[] = []) {
    level.forEach(item => {
      if (item.path?.match(/:|\?/g) || !item.data?.title) {
        return;
      }
      const current = {
        name: item.data.title,
        routerLink: [...path, item.redirectTo ? item.redirectTo : item.path],
        access: item.data.access || false,
      } as MainMenuItem;
      target.push(current);

      if (item.children) {
        current.children = [];
        this._createMenu(item.children, current.children, current.routerLink);
        if (current.children.length === 0) {
          delete current.children;
        }
      }
    });
  }

  private async _updateTitle() {
    this.items.forEach(item => {
      item.expanded = item.expanded || this.router.url.includes(item.routerLink?.join('/') ?? '');
    });

    let route = this.route.snapshot;
    while (route.firstChild) {
      route = route.firstChild;
    }
    if (route.data?.pageTitle || route.data?.title) {
      this.titleService.setTitle(route.data.pageTitle || route.data.title);
    }
  }
}
