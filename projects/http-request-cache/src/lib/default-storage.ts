import {HttpCacheStorage} from './http-cache-storage';
import {Observable} from 'rxjs';

export class DefaultStorage implements HttpCacheStorage {
  private storage = new Map<string, Observable<any>>();

  getItem(key: string): Observable<any> | undefined {
    return this.storage.get(key);
  }

  setItem(key: string, item: Observable<any>): void {
    this.storage.set(key, item);
  }

  deleteItem(key: string): void {
    this.storage.delete(key);
  }
}
