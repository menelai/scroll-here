import {Inject, Injectable, Type} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {HasUnsavedDataConfirmService} from './confirm-service';
import {UnsavedDataConfig} from './unsaved-data-config.interface';
import {unsavedDataConfig} from './unsaved-data.config';

@Injectable({
  providedIn: 'root'
})
export class HasUnsavedDataGuard implements CanDeactivate<Type<any>> {
  constructor(
    @Inject(unsavedDataConfig) private config: UnsavedDataConfig,
    private confirm: HasUnsavedDataConfirmService,
  ) {}


  canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Promise<boolean> | boolean {
    const methodName = component.constructor.prototype.____UnsavedDataChecker____;
    if (component?.[methodName] && component[methodName]()) {
      const params: UnsavedDataConfig = component.____UnsavedDataOptionsHandler____ ? component.____UnsavedDataOptionsHandler____.call(component, component) : null;
      return this.confirm.confirm(
        params?.message ?? this.config.message ?? '',
        params?.title ?? this.config.title,
        params?.ok ?? this.config.ok,
        params?.cancel ?? this.config.cancel,
      );
    } else {
      return true;
    }
  }
}
