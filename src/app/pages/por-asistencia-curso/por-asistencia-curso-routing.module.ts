import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PorAsistenciaCursoPage } from './por-asistencia-curso.page';

const routes: Routes = [
  {
    path: '',
    component: PorAsistenciaCursoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PorAsistenciaCursoPageRoutingModule {}
