import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppLayoutComponent} from "./app-layout/app-layout.component";
import {AuthGuard} from "./mci/guards/auth.guard";
import {LoginComponent} from "./mci/login/login.component";
import {SignupComponent} from "./mci/signup/signup.component";
import {PasswordReminderComponent} from "./mci/password-reminder/password-reminder.component";

const routes: Routes = [
  {
    path: 'pass-reminder',
    component: PasswordReminderComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: '',
    component: AppLayoutComponent,

    children: [
      {
        path: '',
        redirectTo: '/mci',
        pathMatch: 'full',
      },
      {
        path: 'mci',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import(
            './mci/mci.module'
          ).then((m) => m.MciModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
