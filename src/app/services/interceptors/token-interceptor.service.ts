import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Pasó por el interceptor');


    const token = localStorage.getItem('token') ?? "notFound";
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': token
      })
      const reqClone = req.clone({
        headers
      })
      return next.handle(reqClone);
    }

    return next.handle(req);
  }
}
