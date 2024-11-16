// chek-qr-alumno.page.ts
import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { AsistenciaService } from 'src/app/servicios/asistencia.service';

@Component({
  selector: 'app-chek-qr-alumno',
  templateUrl: './chek-qr-alumno.page.html',
  styleUrls: ['./chek-qr-alumno.page.scss'],
})
export class ChekQRAlumnoPage implements OnInit {
  isSupported = false;
  barcodes: Barcode[] = [];
  userLat: number;
  userLng: number;
  readonly duocLat: number = -33.598672;
  readonly duocLng: number = -70.579213;
  readonly maxDistance: number = 100;

  constructor(
    private alertController: AlertController,
    private asistenciaService: AsistenciaService
  ) {}

  ngOnInit() {
    // Verificar si el escáner de código de barras es compatible
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });

    // Solicitar permisos para la ubicación
    this.requestLocationPermission();
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert(
        'Permiso Denegado',
        'Por favor establezca permisos para el uso de barcode scanner.'
      );
      return;
    }

    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);

    const correosEscaneados = this.barcodes.map((barcode) => barcode.displayValue);
    this.asistenciaService.actualizarCorreosEscaneados(correosEscaneados);

    await this.obtenerUbicacion();
    if (this.isDentroDelRango()) {
      this.presentAlert('Ubicación Correcta', 'Estás dentro del edificio de DuocUC');
    } else {
      this.presentAlert('Fuera de Rango', 'Estás fuera del rango del edificio de DuocUC.');
    }
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async requestLocationPermission(): Promise<void> {
    try {
      const permission = await Geolocation.requestPermissions();
      if (permission.location !== 'granted') {
        this.presentAlert('Permiso Denegado', 'Por favor, permita el acceso a la ubicación.');
      }
    } catch (error) {
      console.error('Error al solicitar permisos de ubicación:', error);
      this.presentAlert('Error', 'No se pudo solicitar el permiso de ubicación.');
    }
  }

  async obtenerUbicacion(): Promise<void> {
    try {
      const position = await Geolocation.getCurrentPosition();
      this.userLat = position.coords.latitude;
      this.userLng = position.coords.longitude;
    } catch (error) {
      console.error('Error al obtener ubicación:', error);
      this.presentAlert('Error', 'No se pudo obtener la ubicación.');
    }
  }

  isDentroDelRango(): boolean {
    const R = 6371;
    const dLat = this.degreesToRadians(this.userLat - this.duocLat);
    const dLng = this.degreesToRadians(this.userLng - this.duocLng);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degreesToRadians(this.duocLat)) *
        Math.cos(this.degreesToRadians(this.userLat)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = R * c * 1000;

    return distancia <= this.maxDistance;
  }

  degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  async presentAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
