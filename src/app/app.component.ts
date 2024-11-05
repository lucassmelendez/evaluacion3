import { Component } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private modalController: ModalController,
    public alertController: AlertController,
    public navCtrl: NavController,
    private menu: MenuController,
    private router: Router
  ) {}

  async salir() {
    const alert = await this.alertController.create({
      header: 'Salir',
      message: '¿Quieres salir?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Sí',
          handler: () => {
            localStorage.removeItem('usuario');
            localStorage.removeItem('tipoUsuario');
            this.navCtrl.navigateRoot('/login');
            this.menu.enable(false);
            this.menu.close(); 
          }
        }
      ]
    });

    await alert.present();
  }

  volver() {
    if (this.router.url === '/home-profe' || this.router.url === '/home-alumno') {
      this.menu.close();
    } else {
      this.navCtrl.back();
      this.menu.close();
    }
  }

  async navigateAndClose(route: string) {
    await this.menu.close('main');

    // Si el usuario no quiere ir a la página de home, navega al destino
    if (route !== '/home') {
      this.router.navigate([route]);
      return;
    }

    const email = localStorage.getItem('usuario');
    if (!email) {
      console.error('Email no encontrado, redirigiendo a login');
      this.router.navigate(['/login']);
      return;
    }

    // Verifica el dominio del correo para determinar la navegación
    if (email.endsWith('@profesor.duoc.cl')) {
      this.menu.close();
      this.router.navigate(['/home-profe']);
    } else if (email.endsWith('@duocuc.cl')) {
      this.menu.close();
      this.router.navigate(['/home-alumno']);
    } else {
      console.error('Tipo de usuario no reconocido, redirigiendo a login');
      this.menu.close();
      this.router.navigate(['/login']);
    }
  }
}
