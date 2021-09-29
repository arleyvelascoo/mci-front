import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MciRoutingModule } from './mci-routing.module';
import { MciComponent } from './mci/mci.component';


@NgModule({
  declarations: [
    MciComponent
  ],
  imports: [
    CommonModule,
    MciRoutingModule
  ]
})
export class MciModule { }
