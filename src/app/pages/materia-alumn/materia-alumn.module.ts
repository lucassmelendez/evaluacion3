import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';  // Importa IonicModule
import { MateriaAlumnPage } from './materia-alumn.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,  
    RouterModule.forChild([{ path: '', component: MateriaAlumnPage }])
  ],
  declarations: [MateriaAlumnPage]
})
export class MateriaAlumnPageModule {}