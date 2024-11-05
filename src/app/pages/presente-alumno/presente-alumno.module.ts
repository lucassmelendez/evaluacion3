import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PresenteAlumnoPageRoutingModule } from './presente-alumno-routing.module';

import { PresenteAlumnoPage } from './presente-alumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PresenteAlumnoPageRoutingModule
  ],
  declarations: [PresenteAlumnoPage]
})
export class PresenteAlumnoPageModule {}
