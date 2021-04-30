import {Observable} from 'rxjs';

export interface HttpCacheStorage {
  setItem(key: string, item: Observable<any>): void;
  getItem(key: string): Observable<any> | undefined;
  deleteItem(key: string): void;
}
