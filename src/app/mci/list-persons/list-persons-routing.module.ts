import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListPersonsComponent} from "./list-persons.component";

const routes: Routes = [
  {
    path: '',
    component: ListPersonsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListPersonsRoutingModule { }
