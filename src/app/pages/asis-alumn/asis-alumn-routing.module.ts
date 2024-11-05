import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsisAlumnPage } from './asis-alumn.page';

const routes: Routes = [
  {
    path: '',
    component: AsisAlumnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsisAlumnPageRoutingModule {}
