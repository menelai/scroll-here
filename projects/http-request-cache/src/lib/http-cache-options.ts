import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpCacheStorage} from './http-cache-storage';

export interface HttpCacheOptions {
  storage?: HttpCacheStorage;
  refreshOn?: Observable<unknown> | Subject<unknown> | BehaviorSubject<unknown>;
}
