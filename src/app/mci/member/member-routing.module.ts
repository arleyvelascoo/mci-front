import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PersonalInformationComponent} from "./personal-information/personal-information.component";

const routes: Routes = [
  {
    path: 'personal-information/:editar',
    component: PersonalInformationComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
