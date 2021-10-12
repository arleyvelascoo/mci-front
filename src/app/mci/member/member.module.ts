import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import {MaterialModule} from "../../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    PersonalInformationComponent
  ],
  imports: [
    CommonModule,
    MemberRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class MemberModule { }
