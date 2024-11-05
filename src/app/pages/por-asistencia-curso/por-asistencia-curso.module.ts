import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PorAsistenciaCursoPageRoutingModule } from './por-asistencia-curso-routing.module';

import { PorAsistenciaCursoPage } from './por-asistencia-curso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PorAsistenciaCursoPageRoutingModule
  ],
  declarations: [PorAsistenciaCursoPage]
})
export class PorAsistenciaCursoPageModule {}
