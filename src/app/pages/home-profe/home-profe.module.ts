import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeProfePageRoutingModule } from './home-profe-routing.module';

import { HomeProfePage } from './home-profe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeProfePageRoutingModule
  ],
  declarations: [HomeProfePage]
})
export class HomeProfePageModule {}
