import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { HttpRequestCache } from 'http-request-cache';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  refresh$ = new Subject<string>();
  constructor(private http: HttpClient) { }

  @HttpRequestCache<DataService>(dataService => ({
    refreshOn: dataService.refresh$,
    refCount: true
  }))
  list(id: string): Observable<any> {
    return this.http.get('assets/angular.json', {params: {id}});
  }
}

