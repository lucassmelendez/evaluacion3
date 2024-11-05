import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsisAlumnPageRoutingModule } from './asis-alumn-routing.module';

import { AsisAlumnPage } from './asis-alumn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsisAlumnPageRoutingModule
  ],
  declarations: [AsisAlumnPage]
})
export class AsisAlumnPageModule {}
