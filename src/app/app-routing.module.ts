import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppLayoutComponent} from "./app-layout/app-layout.component";

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/mci',
        pathMatch: 'full',
      },
      {
        path: 'mci',
        loadChildren: () =>
          import(
            './mci/mci.module'
          ).then((m) => m.MciModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
