import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursosListaPage } from './cursos-lista.page';

const routes: Routes = [
  {
    path: '',
    component: CursosListaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursosListaPageRoutingModule {}
