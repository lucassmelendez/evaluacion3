import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CrudAPIService } from 'src/app/servicios/crud-api.service';
import { Alumno } from 'src/app/model/alumno'; 

@Component({
  selector: 'app-informe',
  templateUrl: './informe.page.html',
  styleUrls: ['./informe.page.scss'],
})
export class InformePage implements OnInit {
  students: Alumno[] = [];
  totalClases: number = 0;

  constructor(
    private alertController: AlertController,
    private crudAPIService: CrudAPIService
  ) {}

  ngOnInit() {   
    this.crudAPIService.getAlumno().subscribe(
      (data) => {
        console.log('Datos recibidos:', data); 
        this.students = data; 
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  public alertButtons = [
    {
      text: 'PDF',
      role: 'pdf',
      handler: () => {
        this.mostrarPDF();
      },
    },

    {
      text: 'CANCELAR',
      role: 'cancel',
      handler: () => {
        console.log('cancelar')
      },
    },
  ];

  async alertaPDF() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Descarga en formato PDF exitosa',
      buttons: ['OK'],
    });
    await alert.present();
  }

  mostrarPDF() {
    this.crudAPIService.getAlumnoPDF().subscribe(
      (pdfBlob) => {
        
        const blobUrl = window.URL.createObjectURL(pdfBlob);
        const anchor = document.createElement('a');
        anchor.href = blobUrl;
        anchor.download = 'informe_alumnos.pdf';
        anchor.click();

        
        window.URL.revokeObjectURL(blobUrl);

        
        this.alertaPDF();
      },
      (error) => {
        console.error('Error al descargar el PDF:', error);
      }
    );
  }
  
  getAttendancePercentage(asistencia: number): string {
    if (this.totalClases === 0) return '0%';
    const percentage = (asistencia / this.totalClases) * 100;
    return percentage.toFixed(2) + '%';
  }
}
