# HttpRequestCache

TS decorator for caching logic of API calls.

Inspired by [How to use TS decorators to add caching logic to API calls](https://indepth.dev/posts/1450/how-to-use-ts-decorators-to-add-caching-logic-to-api-calls)

## Installation

```
npm install @kovalenko/http-request-cache
```

## Supported API

`@HttpRequestCache<T>((thisObj?: T, ...args: any[]) => HttpCacheOptions)` — A method decorator that will cache data

`thisObj` is this object

`args` are decorated method's arguments

```typescript
interface HttpCacheOptions {
  storage?: HttpCacheStorage; // if none specified, the default cache object will be used
  refreshOn?: Observable<unknown> | Subject<unknown> | BehaviorSubject<unknown>; // refresh trigger
}
```

```typescript
export interface HttpCacheStorage {
  setItem(key: string, item: Observable<any>): void; // sets cache
  getItem(key: string): Observable<any> | undefined; // gets cache
  deleteItem(key: string): void; // deletes cache
}
```

## Usage

### Default cache storage

```typescript
@Injectable()
export class DataService {
  refresh$ = new Subject();
  constructor(private http: HttpClient) { }

  @HttpRequestCache<DataService>(dataService => ({
    refreshOn: dataService.refresh$
  }))
  list(): Observable<any> {
    return this.http.get('assets/angular.json');
  }
}
```

### Unsubscribe internal ReplaySubject when there are no subscribers

```typescript
@Injectable()
export class DataService {
  constructor(private http: HttpClient) { }

  @HttpRequestCache<DataService>(dataService => ({
    refCount: true // set refCount to true to unsubscribe cache
  }))
  list(): Observable<any> {
    return this.http.get('assets/angular.json');
  }
}
```

### Custom cache storage

```typescript
@Injectable()
export class DataService {
  refresh$ = new Subject();
  constructor(private http: HttpClient, private cacheService: CacheService) { }

  @HttpRequestCache<DataService>(dataService => ({
    storage: dataService.cacheService,
    refreshOn: dataService.refresh$
  }))
  list(): Observable<any> {
    return this.http.get('assets/angular.json');
  }
}
```

### Parametrized refresh

```typescript
@Injectable()
export class DataService {
  refresh$ = new Subject<string>();
  constructor(private http: HttpClient) { }

  @HttpRequestCache<DataService>((dataService, id: string) => ({
    refreshOn: dataService.refresh$.pipe(filter(r => r === id))
  }))
  list(id: string): Observable<any> {
    return this.http.get('assets/angular.json');
  }
}
```

### If cache invalidation is not necessary
```typescript
@Injectable()
export class DataService {
  constructor(private http: HttpClient) { }

  @HttpRequestCache()
  list(): Observable<any> {
    return this.http.get('assets/angular.json');
  }
}
```

## License

MIT
