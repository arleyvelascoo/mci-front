import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {EMPTY, Observable} from "rxjs";
import {LoaderService} from "../loader/loader.service";
import {finalize} from "rxjs/operators";
import {SnackbarService} from "../snackbar/snackbar.service";
import jwt_decode from "jwt-decode";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(public loaderService: LoaderService, private snackbar: SnackbarService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
    const token = localStorage.getItem('token') ?? "notFound";
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': token
      })
      const reqClone = req.clone({
        headers
      })
      const payload = jwt_decode(token);
      const sToken = token.split(" ");
      console.log(payload);
      if (sToken[0] === "Bearer" && sToken[1]) {
        const expirationDate = new Date(0);
        const now = new Date();
        expirationDate.setUTCSeconds(<number>Object(payload)['exp']);
        if (now <= expirationDate) {
          return next.handle(reqClone).pipe(
            finalize(() => {
              this.loaderService.hide();
            })
          );
        } else {
          localStorage.setItem('token', '');
          this.router.navigate(['/login']).then(() => {
            this.snackbar.show({mensaje: "Inicia sesión nuevamente", tipo: "warning"});
            this.loaderService.hide();
          });
          return EMPTY;
        }
      }
    }

    return next.handle(req).pipe(
      finalize(() => {
        this.loaderService.hide();
      })
    );
  }
}
