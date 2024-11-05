import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckAlumnPageRoutingModule } from './check-alumn-routing.module';

import { CheckAlumnPage } from './check-alumn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckAlumnPageRoutingModule
  ],
  declarations: [CheckAlumnPage]
})
export class CheckAlumnPageModule {}
