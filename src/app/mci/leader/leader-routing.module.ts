import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListDisciplesComponent} from "./list-disciples/list-disciples.component";

const routes: Routes = [
  {
    path: 'disciples',
    component: ListDisciplesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaderRoutingModule { }
