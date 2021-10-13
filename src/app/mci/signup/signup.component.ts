import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/login/login.service";
import {SignUp} from "../../models/signup";
import {take} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      document: ['', Validators.compose([Validators.required])],
      username: ['', Validators.compose([Validators.maxLength(10), Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  signUp() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      let formSighUp: SignUp = this.form.value as SignUp;
      this.loginService.signUp(formSighUp).pipe(take(1))
        .subscribe({
          next: (resp) => {
            if (resp) {
              this.router.navigate(['/mci']).then(r => {
                if (r) {
                }
              });
            } else {
              localStorage.setItem('token', '');
            }
          },
          error: (res)=>{
            console.error(res);
          }
        })
    }

  }

}
