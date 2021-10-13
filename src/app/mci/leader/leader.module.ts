import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaderRoutingModule } from './leader-routing.module';
import { ListDisciplesComponent } from './list-disciples/list-disciples.component';
import { MaterialModule } from "../../material/material.module";
import { ConfirDialogFormComponent } from './confir-dialog-form/confir-dialog-form.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ListDisciplesComponent,
    ConfirDialogFormComponent
  ],
  imports: [
    CommonModule,
    LeaderRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    ConfirDialogFormComponent
  ]
})
export class LeaderModule { }
