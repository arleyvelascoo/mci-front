import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivateChild, CanLoad {

  constructor(private auth:AuthService) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.validarTokenHijo();
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.validarToken();
  }
}
