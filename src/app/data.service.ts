import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { HttpRequestCache } from 'http-request-cache';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  refresh$ = new Subject();
  constructor(private http: HttpClient) { }

  @HttpRequestCache()
  list(): Observable<any> {
    return this.http.get('assets/angular.json');
  }
}

