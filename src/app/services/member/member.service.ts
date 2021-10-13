import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SnackbarService} from "../snackbar/snackbar.service";
import {Observable} from "rxjs";
import {PersonDto} from "../../models/person-dto";
import {environment} from "../../../environments/environment";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient, private snackbar: SnackbarService) {
  }

  getPersonalInformation(): Observable<PersonDto> {
    return this.http.get<PersonDto>(`${environment.urlBackMci}/person/`).pipe(
      catchError(() => {
        this.snackbar.show({
          tipo: 'error',
          mensaje: 'Error obteniendo la información personal',
        });
        return [];
      })
    )
  }

  savePersonalInformation(person: PersonDto): Observable<PersonDto> {
    return this.http.put<PersonDto>(`${environment.urlBackMci}/person`, person).pipe(
      catchError(() => {
        this.snackbar.show({
          tipo: 'error',
          mensaje: 'Error obteniendo la información personal',
        });
        return [];
      })
    )
  }
}
