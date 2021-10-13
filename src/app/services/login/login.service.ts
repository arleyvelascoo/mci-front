import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Login} from "../../models/login";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {SnackbarService} from "../snackbar/snackbar.service";
import {TreeNode} from "../../models/tree-node";
import jwt_decode from "jwt-decode";
import {MAP_ROLES_TREE} from "../../constantes/map-roles-tree";
import {SignUp} from "../../models/signup";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private snackbar: SnackbarService) {
  }

  login(login: Login): Observable<any> {
    return this.http.post(`${environment.urlBackAuth}/signIn`, login)
      .pipe(
        tap({
          next: (res) => {
            if (!res) {
              this.snackbar.show({
                tipo: 'error',
                mensaje: "Unauthorized path",
              });
            }
          },
        }),
        catchError(() => {
          this.snackbar.show({
            tipo: 'error',
            mensaje: 'Unauthorized path',
          });
          return [];
        })
      );
  }

  signUp(signUp: SignUp): Observable<any>{
     return this.http.post(`${environment.urlBackAuth}/signUp`, signUp)
      .pipe(
        tap({
          next: (res) => {
            if (!res) {
              this.snackbar.show({
                tipo: 'error',
                mensaje: "Unauthorized path",
              });
            }
          },
        }),
        catchError(() => {
          this.snackbar.show({
            tipo: 'error',
            mensaje: 'Unauthorized path',
          });
          return [];
        })
      );
  }

  getAuthorizedRoutesMenu(): TreeNode[]{
    let token = localStorage.getItem('token');
    if (token) {
      const payload = jwt_decode(token);
      const sToken = token.split(" ");
      if (sToken[0] === "Bearer" && sToken[1]) {
        let tree = MAP_ROLES_TREE.get(Object(payload)['rolName']);
        if (tree){
          return tree;
        }
        return [];
      }
    }
    this.snackbar.show({
      tipo: 'error',
      mensaje: 'Debe iniciar sesión',
    });
    return [];
  }
}
