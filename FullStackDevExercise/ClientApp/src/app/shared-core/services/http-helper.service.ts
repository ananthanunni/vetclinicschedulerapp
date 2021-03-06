import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DOCUMENT, LocationStrategy } from '@angular/common';

@Injectable()
export class HttpHelperService {
  constructor(private http: HttpClient, @Inject(DOCUMENT) private readonly document: any,
    private readonly locationStrategy: LocationStrategy) { }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }

  put<TIn, TOut>(url: string, data: TIn): Observable<TOut> {
    return this.http.put<TOut>(url, data);
  }
  post<TIn, TOut>(url: string, data: TIn): Observable<TOut> {
    return this.http.post<TOut>(url, data);
  }

  resolveApiUrl(...urlParts: any[]) {
    return `${this.document.location.origin}${this.locationStrategy.getBaseHref()}api/${urlParts.map(r=>r.toString()).filter(r=>!!r).map(url => url.startsWith('/') ? url.substring(1) : url).join('/')}`
  }

  encodeDate(date: Date) {
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  decodeDate(date: string) {
    return new Date(date);
  }
}
