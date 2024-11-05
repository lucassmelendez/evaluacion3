import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsistenciaAlumnPage } from './asistencia-alumn.page';

const routes: Routes = [
  {
    path: '',
    component: AsistenciaAlumnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsistenciaAlumnPageRoutingModule {}
