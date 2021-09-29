import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListPersonsRoutingModule } from './list-persons-routing.module';
import { ListPersonsComponent } from './list-persons.component';
import {MaterialModule} from "../../material/material.module";

@NgModule({
  declarations: [
    ListPersonsComponent
  ],
  imports: [
    CommonModule,
    ListPersonsRoutingModule,
    MaterialModule
  ]
})
export class ListPersonsModule { }
