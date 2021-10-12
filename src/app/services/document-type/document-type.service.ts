import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DocumentType} from "../../models/document-type";
import {environment} from "../../../environments/environment";
import {catchError} from "rxjs/operators";
import {SnackbarService} from "../snackbar/snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {

  constructor(private http: HttpClient, private snackbar: SnackbarService) {
  }

  getAllDocumentTypes(): Observable<DocumentType[]> {
    return this.http.get<DocumentType[]>(`${environment.urlBackMci}/documentType/all`).pipe(
      catchError(() => {
        this.snackbar.show({
          tipo: 'error',
          mensaje: 'Error obteniendo los tipos de documento',
        });
        return [];
      })
    )
  }

}
