import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrProfePage } from './qr-profe.page';

const routes: Routes = [
  {
    path: '',
    component: QrProfePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrProfePageRoutingModule {}
