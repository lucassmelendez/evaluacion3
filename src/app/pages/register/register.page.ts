import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { Alumno } from 'src/app/model/alumno';
import { PersonasService } from 'src/app/servicios/personas.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  alumno: Alumno = { nombre: '', apellido: '', edad: 0, correo: '', password: '', password2: '' , asistencia: 0 , materias: []};

  constructor(
    private router: Router,
    public navCtrl: NavController,
    private alertController: AlertController,
    private cp: PersonasService
  ) {}

  ngOnInit() {}

  async registrar() {
    if (!this.alumno.nombre.trim() || this.alumno.nombre.length < 3 || /\d/.test(this.alumno.nombre) || /\s/.test(this.alumno.nombre)) {
      await this.showAlert('Error', 'El nombre no es válido (3 caracteres o más, sin números ni espacios)');
      return;
    }

    if (!this.alumno.apellido.trim() || this.alumno.apellido.length <= 2 || /\d/.test(this.alumno.apellido) || /\s/.test(this.alumno.apellido)) {
      await this.showAlert('Error', 'El apellido no es válido (3 caracteres o más, sin números ni espacios)');
      return;
    }

    if (!this.alumno.edad || this.alumno.edad < 17 || this.alumno.edad > 100) {
      await this.showAlert('Error', 'La edad ingresada debe ser de 17 años o más');
      return;
    }

    if (!this.alumno.correo || !this.validarCorreo(this.alumno.correo)) {
      await this.showAlert('Error', 'Debes ingresar un correo válido con un dominio de DuocUC Alumno');
      return;
    }

    if (!this.alumno.password || this.alumno.password.length < 6) {
      await this.showAlert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (this.alumno.password !== this.alumno.password2) {
      await this.showAlert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      await this.cp.registrarAlumno(this.alumno); // Llama al método de registro en el servicio
      await this.showAlert('Éxito', 'Registro exitoso. Se ha enviado un correo de verificación.');
      this.navCtrl.navigateForward('/login');
    } catch (err) {
      console.error(err);
      await this.showAlert('Error', 'Hubo un problema al registrar el alumno');
    }
  }

  volver() {
    this.navCtrl.navigateBack('/login');
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  validarCorreo(correo: string): boolean {
    const formatoCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return formatoCorreo.test(correo) && correo.endsWith('@duocuc.cl');
  }
}