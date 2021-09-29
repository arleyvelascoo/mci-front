import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MciComponent} from "./mci/mci.component";

const routes: Routes = [
  {
    path: '',
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
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MciRoutingModule {
}
