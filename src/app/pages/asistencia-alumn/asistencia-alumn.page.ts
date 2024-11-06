import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ClaseService } from 'src/app/servicios/clase.service';
import { CrudAPIService } from 'src/app/servicios/crud-api.service';
import { AlumnoConPresente } from 'src/app/model/alumno';
import { AsistenciaService } from 'src/app/servicios/asistencia.service';
import { AsistenciaCurso, MateriaCurso } from 'src/app/model/materias';
import { ApiMateriasService } from 'src/app/servicios/api-materias.service';

@Component({
  selector: 'app-asistencia-alumn',
  templateUrl: './asistencia-alumn.page.html',
  styleUrls: ['./asistencia-alumn.page.scss'],
})
export class AsistenciaAlumnPage implements OnInit {
  students: AlumnoConPresente[] = [];
  materiaId: number;
  materiaSeleccionada: MateriaCurso;  // Añadido para representar la materia seleccionada

  constructor(
    private alertController: AlertController,
    private claseService: ClaseService,
    private crudAPIService: CrudAPIService,
    private navCtrl: NavController,
    private asistenciaService: AsistenciaService,
    private apiMateriasService: ApiMateriasService
  ) {}

  ngOnInit() {
    this.loadAlumnos();

    // Suscribirse a los correos escaneados
    this.asistenciaService.correosEscaneados$.subscribe((correosEscaneados) => {
      this.marcarPresentes(correosEscaneados);
    });

    // Cargar la información de la materia
    this.loadMateria();
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
        console.error('Error al obtener los datos de los alumnos:', error);
      }
    );
  }

  loadMateria() {
    // Obtener los detalles de la materia seleccionada
    this.apiMateriasService.getMaterias().subscribe(
      (materia: MateriaCurso) => {
        this.materiaSeleccionada = materia;
      },
      (error) => {
        console.error('Error al obtener los datos de la materia:', error);
      }
    );
  }

  toggleAttendance(student: AlumnoConPresente, event: any) {
    student.presente = event.detail.checked;
  }

  async confirmarAsistencia() {
    // Registrar la asistencia de los alumnos seleccionados
    const promesas = this.students.map(async (student) => {
      if (student.presente) {
        try {
          // Crear el objeto de asistencia con los valores adecuados
          const data: AsistenciaCurso = {
            alumno: Number(student.id),            // ID del alumno
            materia: this.materiaSeleccionada,      // El objeto completo de MateriaCurso
            asistencia: true,                       // Asistencia registrada como 'presente'
            fecha: new Date().toISOString().split('T')[0],  // Fecha actual en formato YYYY-MM-DD
          };

          // Realizar la llamada a la API para actualizar la asistencia
          await this.crudAPIService.actualizarAsistencia(data).toPromise();
        } catch (error) {
          console.error('Error al registrar asistencia para el alumno:', student.id, error);
        }
      }
    });

    // Espera que todas las promesas se completen
    await Promise.all(promesas);

    // Incrementar el total de clases después de registrar todas las asistencias
    this.claseService.incrementarClases();

    // Navegar a la página de inicio
    this.navCtrl.navigateForward(['/home-profe']);

    // Mostrar alerta de éxito
    const alert = await this.alertController.create({
      message: 'Asistencia registrada exitosamente',
      buttons: ['OK'],
    });
    await alert.present();
  }

  marcarPresentes(correosEscaneados: string[]) {
    for (const student of this.students) {
      student.presente = correosEscaneados.includes(student.correo);
    }
  }
}
