import {inject, Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, ActivationEnd, Router, Routes} from '@angular/router';
import {filter, startWith} from 'rxjs';

import {MainMenuItem} from './main-menu-item';
import {MainMenuTitleService} from './main-menu-title-service';
import random from './random';

@Injectable({
  providedIn: 'root',
})
export class MainMenuService<T = any> {

  readonly items: MainMenuItem<T>[] = [];

  readonly #titleService = inject(MainMenuTitleService, {optional: true}) ?? inject(Title);

  readonly #route = inject(ActivatedRoute);

  readonly #router = inject(Router);

  constructor() {
    this.#createMenu(this.#router.config);

    this.#router
      .events
      .pipe(
        startWith(new ActivationEnd(0 as any)),
        filter(event => event instanceof ActivationEnd),
      )
      .subscribe(() => {
        this.#updateTitle();
      });
  }

  #createMenu(level: Routes, target: MainMenuItem[] = this.items, path: string[] = []): void {
    level.forEach(item => {
      if (item.path?.match(/:|\?/g) || !item.data?.['title']) {
        return;
      }
      const current = {
        id: random(),
        name: item.data['title'],
        routerLink: [...path, item.redirectTo ? item.redirectTo : item.path],
        queryParams: item.data?.['queryParams'] ?? null,
        access: item.data['access'] || false,
      } as MainMenuItem;

      target.push(current);

      if (item.children || item.data['children']) {
        current.children = [];
        this.#createMenu(item.children ?? item.data['children'], current.children, current.routerLink);
        if (current.children.length === 0) {
          delete current.children;
        }
      }
    });
  }

  #updateTitle(): void {
    let route = this.#route.snapshot;
    while (route.firstChild) {
      route = route.firstChild;
    }
    if (route.data?.['pageTitle'] || route.data?.['title']) {
      this.#titleService.setTitle(route.data['pageTitle'] || route.data['title']);
    }
  }
}
