import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PresenteAlumnoPage } from './presente-alumno.page';

const routes: Routes = [
  {
    path: '',
    component: PresenteAlumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PresenteAlumnoPageRoutingModule {}
