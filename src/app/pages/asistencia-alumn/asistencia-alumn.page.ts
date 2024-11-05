import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ClaseService } from 'src/app/servicios/clase.service';
import { CrudAPIService } from 'src/app/servicios/crud-api.service';
import { AlumnoConPresente } from 'src/app/model/alumno';
import { AsistenciaService } from 'src/app/servicios/asistencia.service';

@Component({
  selector: 'app-asistencia-alumn',
  templateUrl: './asistencia-alumn.page.html',
  styleUrls: ['./asistencia-alumn.page.scss'],
})
export class AsistenciaAlumnPage implements OnInit {
  students: AlumnoConPresente[] = [];
  totalClases: number = 0;

  constructor(
    private alertController: AlertController,
    private claseService: ClaseService,
    private crudAPIService: CrudAPIService,
    private navCtrl: NavController,
    private asistenciaService: AsistenciaService
  ) {}

  ngOnInit() {
    this.loadAlumnos();
    this.claseService.totalClases$.subscribe((total) => {
      this.totalClases = total;
    });

    // Suscribirse a los correos escaneados
    this.asistenciaService.correosEscaneados$.subscribe((correosEscaneados) => {
      this.marcarPresentes(correosEscaneados);
    });
  }

  loadAlumnos() {
    this.crudAPIService.getAlumno().subscribe(
      (data) => {
        this.students = data.map((student) => ({
          ...student,
          presente: false,
        })) as AlumnoConPresente[];
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  toggleAttendance(student: AlumnoConPresente, event: any) {
    student.presente = event.detail.checked;
  }

  async confirmarAsistencia() {
    // Incrementar el total de clases
    this.claseService.incrementarClases();
  
    // Registrar la asistencia de los alumnos seleccionados
    const promesas = this.students.map(async (student) => {
      if (student.presente) {
        try {
          // Incrementar la asistencia del alumno
          await this.crudAPIService.incrementarAsistencia({ correo: student.correo }).toPromise();
        } catch (error) {
          console.error('Error al incrementar la asistencia:', error);
        }
      }
    });

    // Espera que todas las promesas se completen
    await Promise.all(promesas);
  
    // Navegar a la página de inicio
    this.navCtrl.navigateForward(['/home-profe']);
  
    // Mostrar alerta de éxito
    const alert = await this.alertController.create({
      message: 'Asistencia registrada exitosamente',
      buttons: ['OK'],
    });
    await alert.present();
  }

  getAttendancePercentage(asistencia: number): string {
    if (this.totalClases === 0) return '0%';
    const percentage = (asistencia / this.totalClases) * 100;
    return percentage.toFixed(2) + '%';
  }

  marcarPresentes(correosEscaneados: string[]) {
    for (const student of this.students) {
      student.presente = correosEscaneados.includes(student.correo);
    }
  }
}
