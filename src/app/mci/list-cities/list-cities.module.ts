import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListCitiesRoutingModule } from './list-cities-routing.module';
import { ListCitiesComponent } from './list-cities.component';


@NgModule({
  declarations: [
    ListCitiesComponent
  ],
  imports: [
    CommonModule,
    ListCitiesRoutingModule
  ]
})
export class ListCitiesModule { }
