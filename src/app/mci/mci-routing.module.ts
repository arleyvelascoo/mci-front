import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MciComponent} from "./mci/mci.component";
import {AuthGuard} from "./guards/auth.guard";


const routes: Routes = [
  {
    path: '',
    // canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: MciComponent,
      },
      {
        path: 'list-persons',
        loadChildren: () =>
          import(
            './list-persons/list-persons.module'
            ).then((m) => m.ListPersonsModule),
      },

      {
        path: 'list-cities',
        loadChildren: () =>
          import(
            './list-cities/list-cities.module'
            ).then((m) => m.ListCitiesModule),
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MciRoutingModule {
}
