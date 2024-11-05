import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import type { Animation } from '@ionic/angular';
@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.page.html',
  styleUrls: ['./notfound.page.scss'],
})
export class NotfoundPage implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit() {
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
