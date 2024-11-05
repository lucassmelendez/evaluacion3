import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation'; // Importamos geolocalización
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

  // Coordenadas del centro del edificio DuocUC Puente Alto
  readonly duocLat: number = -33.598672;  // Latitud de DuocUC
  readonly duocLng: number = -70.579213;  // Longitud de DuocUC
  readonly maxDistance: number = 100;     // Rango máximo en metros

  constructor(
    private alertController: AlertController,
    private asistenciaService: AsistenciaService
  ) {}

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert('Permiso Denegado', 'Por favor establezca permisos para el uso de barcode scanner.');
      return;
    }

    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);

    const correosEscaneados = this.barcodes.map((barcode) => barcode.displayValue);
    this.asistenciaService.actualizarCorreosEscaneados(correosEscaneados);

    // Solicitar ubicación del usuario
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

  async obtenerUbicacion(): Promise<void> {
    try {
      const position = await Geolocation.getCurrentPosition();
      this.userLat = position.coords.latitude;
      this.userLng = position.coords.longitude;
      console.log('Ubicación obtenida:', this.userLat, this.userLng);
    } catch (error) {
      console.error('Error al obtener ubicación:', error);
      this.presentAlert('Error', 'No se pudo obtener la ubicación.');
    }
  }

  // Función para calcular la distancia entre dos coordenadas usando la fórmula de Haversine
  isDentroDelRango(): boolean {
    const R = 6371; // Radio de la Tierra en km
    const dLat = this.degreesToRadians(this.userLat - this.duocLat);
    const dLng = this.degreesToRadians(this.userLng - this.duocLng);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degreesToRadians(this.duocLat)) *
        Math.cos(this.degreesToRadians(this.userLat)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = R * c * 1000; // Distancia en metros

    return distancia <= this.maxDistance;
  }

  // Convertir grados a radianes
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
