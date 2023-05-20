import {inject} from '@angular/core';
import {CanDeactivateFn} from '@angular/router';
import {HasUnsavedDataConfirmService} from './confirm-service';
import {UnsavedDataConfig} from './unsaved-data-config.interface';
import {UNSAVED_DATA_CONFIG} from './unsaved-data.config';

export const hasUnsavedDataGuard: CanDeactivateFn<any> = component => {
  const config: UnsavedDataConfig = inject(UNSAVED_DATA_CONFIG);
  const confirm = inject(HasUnsavedDataConfirmService);

  const methodName = component.constructor.prototype.____UnsavedDataChecker____;

  console.log('called', methodName);

  if (component?.[methodName] && component[methodName]()) {
    const params: UnsavedDataConfig = component.____UnsavedDataOptionsHandler____ ? component.____UnsavedDataOptionsHandler____.call(component, component) : null;
    return (confirm.confirm(
      params?.message ?? config.message ?? '',
      params?.title ?? config.title,
      params?.ok ?? config.ok,
      params?.cancel ?? config.cancel,
    ) as Promise<boolean>).then(v => !!v);
  } else {
    return true;
  }
};
