import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeProfePage } from './home-profe.page';

const routes: Routes = [
  {
    path: '',
    component: HomeProfePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeProfePageRoutingModule {}
