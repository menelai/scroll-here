import {UnsavedDataConfig} from './unsaved-data-config.interface';

export const UnsavedDataChecker = <T extends Record<string, any>>(optionsHandler?: (obj: T) => UnsavedDataConfig): MethodDecorator => {
  return (target: Record<string, any>, methodName, descriptor) => {
    if (target.constructor.prototype.____UnsavedDataChecker____) {
      throw new Error('There can be only one @UnsavedDataChecker() in a class');
    }

    target.constructor.prototype.____UnsavedDataChecker____ = methodName;
    target.constructor.prototype.____UnsavedDataOptionsHandler____ = optionsHandler;

    function beforeUnload(e: Event): void {
      // @ts-ignore
      if (this[methodName]()) {
        e.returnValue = true;
      }
    }

    let binded: (e: Event) => void;
    const originalNgOnInit = target.constructor.prototype.ngOnInit;
    target.constructor.prototype.ngOnInit = function(this: any): void {
      originalNgOnInit && originalNgOnInit.call(this);

      binded = beforeUnload.bind(this);
      window.addEventListener('beforeunload', binded);
    };

    const originalNgOnDestroy = target.constructor.prototype.ngOnDestroy;
    target.constructor.prototype.ngOnDestroy = function(this: any): void {
      originalNgOnDestroy && originalNgOnDestroy.call(this);

      window.removeEventListener('beforeunload', binded);
    };

    return descriptor;
  }
}
