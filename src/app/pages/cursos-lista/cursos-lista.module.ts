import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CursosListaPageRoutingModule } from './cursos-lista-routing.module';

import { CursosListaPage } from './cursos-lista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CursosListaPageRoutingModule
  ],
  declarations: [CursosListaPage]
})
export class CursosListaPageModule {}
