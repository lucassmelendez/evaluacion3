import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnvCorreoPageRoutingModule } from './env-correo-routing.module';

import { EnvCorreoPage } from './env-correo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnvCorreoPageRoutingModule
  ],
  declarations: [EnvCorreoPage]
})
export class EnvCorreoPageModule {}
