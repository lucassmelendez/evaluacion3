import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { Alumno } from 'src/app/model/alumno';
import { Profesor } from 'src/app/model/profesor';
import { PersonasService } from 'src/app/servicios/personas.service';

@Component({
  selector: 'app-env-correo',
  templateUrl: './env-correo.page.html',
  styleUrls: ['./env-correo.page.scss'],
})
export class EnvCorreoPage implements OnInit {

  Alumno: Alumno = { nombre: '', apellido: '', edad: 0, correo: '', password: '', password2: '', asistencia: 0, materias: [] };
  profesor: Profesor = { nombre: '', apellido: '', edad: 0, correo: '', password: '', password2: '', curso: ''  };
  correo: string = ''; // Almacena el correo ingresado

  constructor(
    private router: Router,
    public navCtrl: NavController,
    private alertController: AlertController,
    private cp: PersonasService
  ) { }

  ngOnInit() {}

  validarCorreo(correo: string): boolean {
    const formatoCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formatoCorreo.test(correo)) {
      return false;
    }

    const dominioValido = correo.endsWith('@duocuc.cl') || correo.endsWith('@profesor.duoc.cl');
    return dominioValido;
  }

  async EnviarCodigo() {
    if (!this.correo || !this.validarCorreo(this.correo)) {
      await this.showAlert('Error', 'Debes ingresar un correo válido con un dominio de DuocUC o Profesor Duoc.');
      return;
    }

    const existeCorreo = await this.cp.verificar_correo(this.correo);

    if (!existeCorreo) {
      await this.showAlert('Error', 'El correo ingresado no está registrado.');
      return;
    }

    try {
      await this.cp.enviarCorreoRestablecimiento(this.correo);
      await this.showAlert('Éxito', 'Se ha enviado un correo para restablecer la contraseña.');
      this.router.navigate(['/login']);
    } catch (error) {
      await this.showAlert('Error', 'Ocurrió un problema al enviar el correo de restablecimiento.');
    }
  }

  volver() {
    this.navCtrl.back();
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
