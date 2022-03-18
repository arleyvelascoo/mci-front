import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LeaderRoutingModule} from './leader-routing.module';
import {ListDisciplesComponent} from './list-disciples/list-disciples.component';
import {MaterialModule} from "../../material/material.module";
import {ConfirDialogFormComponent} from './confir-dialog-form/confir-dialog-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import { FillDataComponent } from './fill-data/fill-data.component';

@NgModule({
  declarations: [
    ListDisciplesComponent,
    ConfirDialogFormComponent,
    FillDataComponent,
  ],
  imports: [
    CommonModule,
    LeaderRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    CKEditorModule,
  ],
  entryComponents: [
    ConfirDialogFormComponent,
    FillDataComponent
  ],
  exports: [
    CKEditorModule
  ]
})
export class LeaderModule {
}
