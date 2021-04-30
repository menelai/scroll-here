# HttpRequestCache

TS decorator for caching logic of API calls

## Installation

```
npm install @kovalenko/http-request-cache
```

## Supported API

`@HttpRequestCache<T>(thisObj? => HttpCacheOptions)` — A method decorator that will cache data

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
