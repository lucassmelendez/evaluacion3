import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistenciaAlumnPageRoutingModule } from './asistencia-alumn-routing.module';

import { AsistenciaAlumnPage } from './asistencia-alumn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistenciaAlumnPageRoutingModule
  ],
  declarations: [AsistenciaAlumnPage]
})
export class AsistenciaAlumnPageModule {}
