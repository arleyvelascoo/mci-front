import {Injectable} from '@angular/core';
import jwt_decode from 'jwt-decode';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {
  }

  validarToken() {
    //El token tiene los siguientes campos
    const token = localStorage.getItem('token') ?? "notFound";
    if (token) {
      const payload = jwt_decode(token);
      const sToken = token.split(" ");
      console.log(payload);
      if (sToken[0] === "Bearer" && sToken[1]) {
        const expirationDate = new Date(0);
        const now = new Date();
        expirationDate.setUTCSeconds(<number>Object(payload)['exp']);
        if (now <= expirationDate){
          return true;
        }
      }
    }
    localStorage.setItem('token', '');
    this.router.navigate(['/login']).then(r => {
      console.log(r)
    });
    return false;
  }

  validarTokenHijo() {
    //El token tiene los siguientes campos
    const token = localStorage.getItem('token') ?? "notFound";
    const payload = jwt_decode(token);
    const sToken = token.split(" ");
    return !!(sToken[0] === "Bearer" && sToken[1] && Object(payload)['idUser'] === 2);
  }

}
