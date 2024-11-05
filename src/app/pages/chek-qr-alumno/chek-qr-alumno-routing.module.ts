import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChekQRAlumnoPage } from './chek-qr-alumno.page';

const routes: Routes = [
  {
    path: '',
    component: ChekQRAlumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChekQRAlumnoPageRoutingModule {}
