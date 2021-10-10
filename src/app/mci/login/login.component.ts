import {Component, OnInit} from '@angular/core';
import {RolService} from "../../services/rol/rol.service";
import {Rol} from "../../models/rol";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {take} from "rxjs/operators";
import {Login} from "../../models/login";
import {Router} from "@angular/router";
import {LoginService} from "../../services/login/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  foods: Rol[] = [];
  form!: FormGroup;

  constructor(private rolService: RolService, private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.maxLength(10), Validators.required])],
      password: ['', []],
      idRol: ['', Validators.compose([Validators.required])],
    });
    this.getRoles();
  }

  getRoles() {
    this.rolService.getAllRoles().pipe(take(1))
      .subscribe({
        next: (data) => {
          console.log(data);
          this.foods = data;
        }
      })
  }

  login() {
    let login: Login = <Login> this.form.value;
    console.log(this.form.getRawValue())
    this.loginService.login(login).pipe(take(1))
      .subscribe({
      next: (resp) => {
        if (resp) {
          console.log("Respuesta del token", resp.data);
          localStorage.setItem('token', 'Bearer ' + resp.token);
          this.router.navigate(['/mci']).then(r=>{
            if (r){
              console.log('Successfully');
            }
          });
        } else {
          localStorage.setItem('token', '');
          console.log('An error has occurred');
        }
      }
    })
    console.log(login);
  }
}
