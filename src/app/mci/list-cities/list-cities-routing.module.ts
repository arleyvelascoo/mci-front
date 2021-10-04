import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListCitiesComponent} from "./list-cities.component";

const routes: Routes = [
  {
    path: '',
    component: ListCitiesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListCitiesRoutingModule { }
