import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// listado de componentes
import { PieComponent } from '../pie/pie.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [PieComponent,],
  imports: [
    CommonModule,IonicModule,
  ],exports:[
    PieComponent,
  ]
})
export class ModuloModule { }
