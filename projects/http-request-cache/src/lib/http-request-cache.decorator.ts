import {HttpCacheOptions} from './http-cache-options';
import {NEVER, Observable} from 'rxjs';
import {shareReplay, startWith, switchMap} from 'rxjs/operators';
import {DefaultStorage} from './default-storage';

type HttpRequestCacheMethod = (...args: any[]) => Observable<any>;

export const HttpRequestCache = <T extends Record<string, any>>(optionsHandler?: (obj: T, ...args: any[]) => HttpCacheOptions) => {
  return (target: T, methodName: string, descriptor: TypedPropertyDescriptor<HttpRequestCacheMethod>): TypedPropertyDescriptor<HttpRequestCacheMethod> => {
    if (!(descriptor?.value instanceof Function)) {
      throw Error(`'@HttpRequestCache' can be applied only to the class method which returns an Observable`);
    }

    const cacheKeyPrefix = `${target.constructor.name}_${methodName}`;
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]): Observable<any> {
      const options = optionsHandler?.call(this as T, this as T, ...args);

      if (!options?.storage && !(target as any)._____storage_____) {
        (target as any)._____storage_____ = new DefaultStorage();
      }

      const storage = options?.storage ?? (target as any)._____storage_____;
      const refreshOn = options?.refreshOn ?? NEVER as Observable<unknown>;

      const key = `${cacheKeyPrefix}_${JSON.stringify(args)}`;

      let observable = storage.getItem(key);

      if (!observable) {
        observable = refreshOn.pipe(
          startWith(true),
          switchMap(() => originalMethod.apply(this, [...args])),
          shareReplay({
            bufferSize: 1,
            refCount: options?.refCount ?? false,
          }),
        );
        storage.setItem(key, observable);
      }

      return observable;
    };

    return descriptor;
  }
}

