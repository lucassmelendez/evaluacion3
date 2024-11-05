import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursosQRPage } from './cursos-qr.page';

const routes: Routes = [
  {
    path: '',
    component: CursosQRPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursosQRPageRoutingModule {}
