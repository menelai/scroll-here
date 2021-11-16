import {Component} from '@angular/core';

export function UnsavedDataChecker(): MethodDecorator {
  return (target: Record<string, any>, methodName, descriptor) => {
    if (target.constructor.prototype.____UnsavedDataChecker____) {
      throw new Error('There can be only one @UnsavedDataChecker() in a class');
    }

    target.constructor.prototype.____UnsavedDataChecker____ = methodName;

    function beforeUnload(e: Event): void {
      // @ts-ignore
      e.returnValue = this[methodName]();
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
