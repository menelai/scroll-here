export function CheckUnsavedData(): ClassDecorator {
  return (type): void => {
    if (typeof type.prototype.hasUnsavedData !== 'function') {
      throw new Error(`${type.name} does not have hasUnsavedData() method`);
    }

    function beforeUnload(e: Event): void {
      // @ts-ignore
      e.returnValue = this.hasUnsavedData();
    }

    let binded: (e: Event) => void;
    const originalNgOnInit = type.prototype.ngOnInit;
    type.prototype.ngOnInit = function(this: any): void {
      originalNgOnInit && originalNgOnInit.call(this);

      binded = beforeUnload.bind(this);
      window.addEventListener('beforeunload', binded);
    };

    const originalNgOnDestroy = type.prototype.ngOnDestroy;
    type.prototype.ngOnDestroy = function(this: any): void {
      originalNgOnDestroy && originalNgOnDestroy.call(this);

      window.removeEventListener('beforeunload', binded);
    };
  };
}
