import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CursosInformePageRoutingModule } from './cursos-informe-routing.module';

import { CursosInformePage } from './cursos-informe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CursosInformePageRoutingModule
  ],
  declarations: [CursosInformePage]
})
export class CursosInformePageModule {}
