import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MateriaAlumnPage } from './materia-alumn.page';

const routes: Routes = [
  {
    path: '',
    component: MateriaAlumnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MateriaAlumnPageRoutingModule {}
