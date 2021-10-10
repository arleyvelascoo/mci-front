import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Rol} from "../../models/rol";

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http: HttpClient) { }

  getAllRoles():Observable<Rol[]>{
    return this.http.get<Rol[]>(`${environment.urlBackAuth}/roles`);
  }

}
