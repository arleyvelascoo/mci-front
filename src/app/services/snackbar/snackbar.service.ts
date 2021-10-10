import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {Snackbar} from './snackbar.model';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackbar: MatSnackBar) {
  };

  show(data: Snackbar, durationShow?: number): void {
    if (!durationShow){
      durationShow = 3000;
    }
    this.snackbar.open(data.mensaje, 'Cerrar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: durationShow,
      panelClass: data.tipo
    });
  };

  showBackError(result: HttpErrorResponse): void {
    this.snackbar.open(result.message, 'Cerrar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  };
}
