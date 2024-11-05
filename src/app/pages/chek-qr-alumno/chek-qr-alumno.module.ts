import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChekQRAlumnoPageRoutingModule } from './chek-qr-alumno-routing.module';

import { ChekQRAlumnoPage } from './chek-qr-alumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChekQRAlumnoPageRoutingModule
  ],
  declarations: [ChekQRAlumnoPage]
})
export class ChekQRAlumnoPageModule {}
