import {Injectable, Type} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {ConfirmService} from '@kovalenko/material-confirm';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class HasUnsavedDataGuard implements CanDeactivate<Type<any>> {
  constructor(
    private confirm: ConfirmService,
    private t: TranslateService,
  ) {}


  canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Promise<boolean> | boolean {
    const methodName = component.constructor.prototype.____UnsavedDataChecker____ ?? 'hasUnsavedData';
    if (component?.[methodName] && component[methodName]()) {
      return this.confirm.confirm(this.t.instant('There is unsaved data'), undefined,  this.t.instant('Leave page'), this.t.instant('Continue editing'));
    } else {
      return true;
    }
  }
}
