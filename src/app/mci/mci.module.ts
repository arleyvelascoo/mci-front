import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MciRoutingModule } from './mci-routing.module';
import { MciComponent } from './mci/mci.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    MciComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    MciRoutingModule
  ]
})
export class MciModule { }
