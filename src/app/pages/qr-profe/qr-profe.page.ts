// qr-profe.page.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-qr-profe',
  templateUrl: './qr-profe.page.html',
  styleUrls: ['./qr-profe.page.scss'],
})
export class QrProfePage implements OnInit, OnDestroy {
  valorQR: string = '';
  valorQRJSON: any = {};
  correoProfesor: string | null = localStorage.getItem('usuario');
  nombre: string | null = localStorage.getItem('nombreCurso');
  tiempoRestante: number = 300; // 5 minutos en segundos
  intervalId: any;
  mensajeEstado: string = '';
  codigoQR: number = 1; // Variable para el contador de códigos QR

  constructor(private navCtrl: NavController, private http: HttpClient) {}

  ngOnInit() {
    this.actualizarQr();
    this.iniciarTemporizador();

    const contadorGuardado = localStorage.getItem('codigoQR');
    if (contadorGuardado) {
      this.codigoQR = parseInt(contadorGuardado, 10);
    }
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  iniciarTemporizador() {
    this.intervalId = setInterval(() => {
      this.tiempoRestante--;

      if (this.tiempoRestante <= 0) {
        clearInterval(this.intervalId);
        this.redirigir();
      }
    }, 1000);
  }

  redirigir() {
    this.navCtrl.navigateForward('/asistencia-alumn');
  }

  actualizarQr() {
    const cursoIdSeleccionado: string | null = localStorage.getItem('cursoIdSeleccionado');

    if (cursoIdSeleccionado) {
      this.codigoQR++;
      localStorage.setItem('codigoQR', this.codigoQR.toString());

      this.valorQRJSON = {
        codigocurso: cursoIdSeleccionado,
        codigoprofe: this.correoProfesor || '',
        codigonombre: this.nombre || '',
        fecha: formatDate(new Date(), 'dd/MM/yyyy HH:mm', 'en-US'),
        codigoqr: this.codigoQR.toString(),
      };
      this.valorQR = JSON.stringify(this.valorQRJSON);
      this.mensajeEstado = 'QR generado correctamente.';
    } else {
      this.mensajeEstado = 'Error: No se encontró el ID del curso seleccionado.';
      console.error('No se encontró el ID del curso seleccionado');
    }
  }
}
