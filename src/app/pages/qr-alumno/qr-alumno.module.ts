import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QRAlumnoPageRoutingModule } from './qr-alumno-routing.module';

import { QRAlumnoPage } from './qr-alumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRAlumnoPageRoutingModule
  ],
  declarations: [QRAlumnoPage]
})
export class QRAlumnoPageModule {}
