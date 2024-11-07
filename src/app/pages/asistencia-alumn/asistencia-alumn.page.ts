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
  materiaSeleccionada: MateriaCurso[] = []; // Representa la materia seleccionada
  correoProfesor: string | null = ''; // Correo del profesor logueado
  materiasDelProfesor: MateriaCurso[] = [];

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

    this.correoProfesor = localStorage.getItem('usuario');

    // Obtener las materias desde el API
    this.apiMateriasService.getMaterias().subscribe(
      (data) => {
        console.log('Datos recibidos:', data);
        this.materiaSeleccionada = data;

        // Filtrar las materias que correspondan al profesor logueado
        this.materiasDelProfesor = this.materiaSeleccionada.filter(
          (m) => m.correo_profe === this.correoProfesor
        );

        // Guardar las materias del profesor en localStorage
        localStorage.setItem('materiasDelProfesor', JSON.stringify(this.materiasDelProfesor));

        console.log('Materias del profesor:', this.materiasDelProfesor);
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
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

  toggleAttendance(student: AlumnoConPresente, event: any) {
    student.presente = event.detail.checked;
  }

  async confirmarAsistencia() {
    // Cargar la materia seleccionada desde localStorage
    const materiasGuardadas = localStorage.getItem('materiasDelProfesor');
    this.materiaSeleccionada = materiasGuardadas ? JSON.parse(materiasGuardadas) : [];
  
    // Registrar la asistencia de los alumnos seleccionados
    for (const student of this.students) {
      if (student.presente) {
        const asistenciaData = {
          alumno: student.id ? parseInt(student.id, 10) : 0,
          nombre: this.materiaSeleccionada[0].nombre,
          correo_profe: this.materiaSeleccionada[0].correo_profe,
          fecha: new Date().toISOString(),
          presente: true,
        };
  
        try {
          console.log(asistenciaData);
          
          // Llamada a la API para registrar la asistencia de un alumno
          await this.apiMateriasService.actualizarAsistencia(asistenciaData).toPromise(); // Asegúrate de que la URL aquí coincida con /api/asistencia/
  
          // Incrementar el total de clases después de registrar todas las asistencias
          this.claseService.incrementarClases();
  
          // Mostrar alerta de éxito
          const alert = await this.alertController.create({
            message: 'Asistencia registrada exitosamente',
            buttons: ['OK'],
          });
          await alert.present();
        } catch (error) {
          console.error('Error al registrar la asistencia:', error);
        }
      }
    }
  
    // Navegar a la página de inicio después de procesar todas las asistencias
    this.navCtrl.navigateForward(['/home-profe']);
}


  marcarPresentes(correosEscaneados: string[]) {
    for (const student of this.students) {
      student.presente = correosEscaneados.includes(student.correo);
    }
  }
}
