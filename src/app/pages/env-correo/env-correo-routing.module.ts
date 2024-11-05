import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnvCorreoPage } from './env-correo.page';

const routes: Routes = [
  {
    path: '',
    component: EnvCorreoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnvCorreoPageRoutingModule {}
