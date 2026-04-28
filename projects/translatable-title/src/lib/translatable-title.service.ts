import {inject, Injectable} from '@angular/core';
import {Subscription} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
import {startWith, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TranslatableTitleService {
  private title = inject(Title);
  private translate = inject(TranslateService);

  private subs = Subscription.EMPTY;

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
