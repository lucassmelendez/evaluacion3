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
  
    // Crear un arreglo de asistencias
    const asistencias: AsistenciaCurso[] = [];
  
    // Registrar la asistencia de los alumnos seleccionados
    this.students.forEach((student) => {
      if (student.presente) {
        const asistenciaData: AsistenciaCurso = {
          alumno: student.id ? parseInt(student.id, 10) : 0, // Asegúrate de que alumno sea un número válido
          nombre: this.materiaSeleccionada[0], // La materia seleccionada completa
          asistencia: true,
          fecha: new Date().toISOString(), // Fecha actual en formato ISO
        };
  
        // Añadimos la asistencia al arreglo
        asistencias.push(asistenciaData);
      }
    });
  
    // Verificamos si hay asistencias que registrar
    if (asistencias.length > 0) {
      try {
        // Aquí estamos enviando todo el objeto para la materia con el arreglo de asistencias
        const materiaData = {
          nombre: this.materiaSeleccionada[0].nombre,
          asistencias: asistencias, // Enviamos el arreglo de asistencias
          correo_profe: this.materiaSeleccionada[0].correo_profe,
          totalClases: this.materiaSeleccionada[0].totalClases,
        };
  
        // Realizamos la solicitud POST al backend
        await this.apiMateriasService.actualizarAsistencia(materiaData).toPromise();
        
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
      } catch (error) {
        console.error('Error al registrar la asistencia:', error);
      }
    } else {
      // Si no hay asistentes presentes, mostramos un mensaje
      const alert = await this.alertController.create({
        message: 'No se registraron asistencias.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
  
  

  marcarPresentes(correosEscaneados: string[]) {
    for (const student of this.students) {
      student.presente = correosEscaneados.includes(student.correo);
    }
  }
}
