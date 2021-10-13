import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Gender} from "../../models/gender";
import {environment} from "../../../environments/environment";
import {catchError} from "rxjs/operators";
import {SnackbarService} from "../snackbar/snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  constructor(private http: HttpClient, private snackbar: SnackbarService) { }

  getAllGender(): Observable<Gender[]> {
    return this.http.get<Gender[]>(`${environment.urlBackMci}/gender/all`).pipe(
      catchError(() => {
        this.snackbar.show({
          tipo: 'error',
          mensaje: 'Error obteniendo los géneros',
        });
        return [];
      })
    )
  }
}
