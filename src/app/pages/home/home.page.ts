import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'; // Importamos NavController
import { CrudAPIService } from 'src/app/servicios/crud-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private navCtrl: NavController) {} // Inyectamos NavController

  ngOnInit(): void {
    setTimeout(() => {
      this.redirectBasedOnUserType();
    }, 4500);
  }

  redirectBasedOnUserType() {
    const tipoUsuario = localStorage.getItem('tipoUsuario');

    if (tipoUsuario === 'alumno') {
      this.navCtrl.navigateForward('/home-alumno');
    } else if (tipoUsuario === 'profesor') {
      this.navCtrl.navigateForward('/home-profe');
    } else {
      this.navCtrl.navigateForward('/login');
    }
  }
}
