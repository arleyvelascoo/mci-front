import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  validarToken(){
    //El token tiene los siguientes campos
    const token = localStorage.getItem('token') ?? "notFound";
    const payload = jwt_decode(token);
    const sToken = token.split(" ");
    return !!(sToken[0] === "Bearer" && sToken[1] && Object(payload)['idUser'] === 1);
  }

  validarTokenHijo(){
    //El token tiene los siguientes campos
    const token = localStorage.getItem('token') ?? "notFound";
    const payload = jwt_decode(token);
    const sToken = token.split(" ");
    return !!(sToken[0] === "Bearer" && sToken[1] && Object(payload)['idUser'] === 2);
  }

}
