import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckAlumnPage } from './check-alumn.page';

const routes: Routes = [
  {
    path: '',
    component: CheckAlumnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckAlumnPageRoutingModule {}
