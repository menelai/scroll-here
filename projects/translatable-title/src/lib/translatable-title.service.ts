import { Injectable } from '@angular/core';
import {Subscription} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
import {startWith, switchMap} from 'rxjs/operators';

@Injectable()
export class TranslatableTitleService {
  private subs = Subscription.EMPTY;
  constructor(private title: Title, private translate: TranslateService) { }

  setTitle(title: string) {
    this.subs.unsubscribe();
    this.subs = this.translate.onLangChange.pipe(
      startWith(''),
      switchMap(() => this.translate.get(title)),
    ).subscribe(translated => {
      this.title.setTitle(translated);
    });
  }
}
