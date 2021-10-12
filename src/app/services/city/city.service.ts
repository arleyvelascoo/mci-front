import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CityDto} from "../../models/city-dto";
import {environment} from "../../../environments/environment";
import {SnackbarService} from "../snackbar/snackbar.service";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient, private snackbar: SnackbarService) { }


  citiesSuggestion(input:string): Observable<CityDto[]> {
    return this.http.get<CityDto[]>(`${environment.urlBackMci}/city?city=${input}`)
      .pipe(
        tap({
          next: (res) => {
            if (!res) {
              this.snackbar.show({
                tipo: 'error',
                mensaje: "Error obteniendo ciudades",
              });
            }
          },
        }),
        catchError(() => {
          this.snackbar.show({
            tipo: 'error',
            mensaje: 'Error obteniendo ciudades',
          });
          return [];
        })

      );
  }
}
