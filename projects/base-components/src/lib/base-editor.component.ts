import {AppInjector} from './services/injector.service';
import {Title} from '@angular/platform-browser';
import {Component, DoCheck, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
import {Observable, Subscription, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {NgForm} from '@angular/forms';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({template: ''})
export class BaseEditorComponent<T> implements DoCheck, OnDestroy {
  form: NgForm;
  protected _id: number;
  protected _entitySubscription = Subscription.EMPTY;
  protected titleService: Title;
  @Input() setTitle: boolean;
  rand = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  protected snackBar: MatSnackBar;
  protected translate: TranslateService;

  protected _message: string;
  locked: boolean;

  @Input() get id(): number {
    return this._id;
  }
  set id(v: number) {
    this._id = v;
    this._loadEntity();
  }

  // tslint:disable-next-line:no-output-rename
  @Output('error') errorEmit = new EventEmitter<string>();

  constructor() {
    const injector = AppInjector.getInjector();
    this.titleService = injector.get(Title);
    this.snackBar = injector.get(MatSnackBar);
    this.translate = injector.get(TranslateService);
  }

  ngDoCheck(): void {}

  ngOnDestroy(): void {
    this._entitySubscription.unsubscribe();
  }

  protected _save(): Observable<T> {
    return new Observable<T>();
  }

  save(): Observable<T> {
    return this._save().pipe(
      tap(() => {
        this.form.form.markAsPristine();
        this.snackBar.open(this.translate.instant(this._message), '', {duration: 3000});
      }),
      catchError(error => {
        this.snackBar.open(error, '', {duration: 5000, panelClass: 'error'});
        return throwError(error);
      })
    );
  }

  submit() {
    this.save().pipe(untilDestroyed(this)).subscribe();
  }

  protected _loadEntity() {
    this._entitySubscription.unsubscribe();
  }

  protected _title(what: string) {
    if (this.setTitle) {
      setTimeout(() => this.titleService.setTitle(what));
    }
  }

}
