import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudpersonaPage } from './crudpersona.page';

const routes: Routes = [
  {
    path: '',
    component: CrudpersonaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudpersonaPageRoutingModule {}
