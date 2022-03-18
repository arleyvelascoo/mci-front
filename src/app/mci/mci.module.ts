import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MciRoutingModule} from './mci-routing.module';
import {MciComponent} from './mci/mci.component';
import {LoginComponent} from './login/login.component';
import {MaterialModule} from "../material/material.module";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { SignupComponent } from './signup/signup.component';
import {ReactiveFormsModule} from "@angular/forms";
import { PasswordReminderComponent } from './password-reminder/password-reminder.component';


@NgModule({
  declarations: [
    MciComponent,
    LoginComponent,
    SignupComponent,
    PasswordReminderComponent
  ],
  imports: [
    CommonModule,
    MciRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class MciModule {
}
