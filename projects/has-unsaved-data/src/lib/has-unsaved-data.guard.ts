import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {ConfirmService} from '@kovalenko/material-confirm';
import {TranslateService} from '@ngx-translate/core';
import {ComponentCanDeactivate} from './has-unsaved-data';

@Injectable({
  providedIn: 'root'
})
export class HasUnsavedDataGuard implements CanDeactivate<ComponentCanDeactivate> {
  constructor(
    private confirm: ConfirmService,
    private t: TranslateService,
  ) {}


  canDeactivate(component: ComponentCanDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Promise<boolean> | boolean {
    if (component?.hasUnsavedData && component.hasUnsavedData()) {
      return this.confirm.confirm(this.t.instant('There is unsaved data'), undefined,  this.t.instant('Leave page'), this.t.instant('Continue editing'));
    } else {
      return true;
    }
  }
}
