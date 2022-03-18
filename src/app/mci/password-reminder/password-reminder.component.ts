import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../services/login/login.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {take} from "rxjs/operators";
import {SnackbarService} from "../../services/snackbar/snackbar.service";

@Component({
  selector: 'app-password-reminder',
  templateUrl: './password-reminder.component.html',
  styleUrls: ['./password-reminder.component.scss']
})
export class PasswordReminderComponent implements OnInit {
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router,
              private snackbar: SnackbarService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.maxLength(10), Validators.required])],
    });
  }

   remindPassword() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      let username: string = this.form.controls.username.value;
      this.loginService.remindPassword(username).pipe(take(1))
        .subscribe({
          next: (resp) => {
            if (resp) {
              this.router.navigate(['/login']).then(r => {
                if (r) {
                }
              });
              this.snackbar.show({
                tipo: 'success',
                mensaje: 'Ha sido enviado un mensaje con su nueva contraseña a su correo'
              }, 6000)
            } else {
              localStorage.setItem('token', '');

            }
          }
        })
    }
  }

}
