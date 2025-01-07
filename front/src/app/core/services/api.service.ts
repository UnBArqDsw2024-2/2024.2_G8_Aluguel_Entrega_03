import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { APP_API } from '../../config/api';

@Injectable({
  providedIn: 'root', // Garantia do Singleton no Angular
})
export class ApiService {
  constructor(private http: HttpClient) {}

  httpOptions(contentType = 'application/json', hasContentType = true): any {
    if (hasContentType) {
      return {
        headers: new HttpHeaders({
          'Content-Type': contentType,
        }),
      };
    }
    return undefined;
  }

  get<T = any>(controller: string): Observable<T> {
    return this.http
      .get<T>(`${APP_API}/${controller}`, {
        ...this.httpOptions,
      })
      .pipe(map((res) => res));
  }

  getWithParams(
    controller: string,
    params: any,
    contentType?: string,
    responseType?: string
  ): Observable<any> {
    return this.http
      .get<any>(`${APP_API}/${controller}`, {
        params: {
          ...params,
        },
        ...this.httpOptions(contentType),
        responseType,
      })
      .pipe(map((resp) => resp));
  }

  getBy<T = any>(controller: string, param: string | number): Observable<T> {
    return this.http.get<T>(`${APP_API}/${controller}/${param}`, {
      ...this.httpOptions,
    });
  }

  getById(controller: string, id: number): Observable<any> {
    return this.http
      .get<any>(`${APP_API}/${controller}/${id}`, {
        ...this.httpOptions,
      })
      .pipe(map((resp) => resp));
  }

  patch(controller: string, id: number, data: any = null): Observable<any> {
    var result = this.http
      .patch<any>(`${APP_API}/${controller}/${id}/`, data, {
        ...this.httpOptions,
      })
      .pipe(map((resp) => resp));

    return result;
  }

  post(controller: string, data: any): Observable<any> {
    return this.http
      .post<any>(`${APP_API}/${controller}`, data, {
        ...this.httpOptions,
      })
      .pipe(map((resp) => resp));
  }

  put(controller: string, data: any, id: number | string): Observable<any> {
    return this.http
      .put<any>(`${APP_API}/${controller}/${id}/`, data, {
        ...this.httpOptions,
      })
      .pipe(map((resp) => resp));
  }

  delete(controller: string, id: number | string): Observable<any> {
    return this.http
      .delete<any>(`${APP_API}/${controller}/${id}`, {
        ...this.httpOptions,
      })
      .pipe(map((resp) => resp));
  }
}
