import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service'; // Importar el servicio de autenticación

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  alumno: any = { correo: '', password: '' }; // Simplificado para el ejemplo

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private authService: AuthService // Inyectar el servicio
  ) {}

  ngOnInit() {
    this.menuCtrl.enable(false); // Deshabilitar el menú para la página de login
  }

  async validar() {
    try {
      const email = this.alumno.correo;
      const password = this.alumno.password;

      // Autenticación utilizando el servicio de autenticación
      this.authService.login(email); // Suponiendo que login maneja la autenticación
      const user = this.authService.getUser(); // Obtener información del usuario

      if (user) {
        localStorage.setItem('usuario', user.email);

        // Navegar basado en el rol
        if (user.role === 'profesor') {
          await this.showAlert('Bienvenido Profesor', 'Has ingresado correctamente');
          this.navCtrl.navigateForward(['/home-profe']);
        } else if (user.role === 'alumno') {
          await this.showAlert('Bienvenido Alumno', 'Has ingresado correctamente');
          this.navCtrl.navigateForward(['/home-alumno']);
        } else {
          await this.presentAlert('Usuario no autorizado.');
        }
        
        this.menuCtrl.enable(true); // Habilitar el menú después del login
      } else {
        await this.presentAlert('Usuario o contraseña incorrecto');
      }
    } catch (error) {
      console.error("Error en la validación:", error);
      await this.presentAlert('Ocurrió un error al iniciar sesión.');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Login',
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}