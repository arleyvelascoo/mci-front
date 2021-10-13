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
export class LeaderService {

  constructor(private http: HttpClient, private snackbar: SnackbarService) {
  }

  getDisciplesPersons(): Observable<PersonDto[]> {
    return this.http.get<PersonDto[]>(`${environment.urlBackMci}/person/disciples/all`).pipe(
      catchError(() => {
        this.snackbar.show({
          tipo: 'error',
          mensaje: 'Error obteniendo lista de miembros asociados',
        });
        return [];
      })
    )
  }

  saveNewMember(person: PersonDto): Observable<PersonDto> {
    return this.http.post<PersonDto>(`${environment.urlBackMci}/person`, person).pipe(
      catchError(() => {
        this.snackbar.show({
          tipo: 'error',
          mensaje: 'Error agregando nuevo registro',
        });
        return [];
      })
    )
  }


  editMember(person: PersonDto): Observable<PersonDto> {
    return this.http.put<PersonDto>(`${environment.urlBackMci}/person`, person).pipe(
      catchError(() => {
        this.snackbar.show({
          tipo: 'error',
          mensaje: 'Error editando el registro',
        });
        return [];
      })
    )
  }

}
