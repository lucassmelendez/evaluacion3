import { Component, OnInit } from '@angular/core';
import { MateriaCurso } from 'src/app/model/materias';
import { ApiMateriasService } from 'src/app/servicios/api-materias.service';
import { CrudAPIService } from 'src/app/servicios/crud-api.service';
import { Alumno } from 'src/app/model/alumno';

@Component({
  selector: 'app-por-asistencia-curso',
  templateUrl: './por-asistencia-curso.page.html',
  styleUrls: ['./por-asistencia-curso.page.scss'],
})
export class PorAsistenciaCursoPage implements OnInit {
  materia: MateriaCurso[] = [];
  materiasDelProfesor: MateriaCurso[] = [];
  alumnos: Alumno[] = []; // Store student data
  correoProfesor: string | null = '';

  constructor(
    private apiMateriasService: ApiMateriasService,
    private crudAPIService: CrudAPIService // Injecting the service to get students
  ) {}

  ngOnInit() {
    this.correoProfesor = localStorage.getItem('usuario');

    this.apiMateriasService.getMaterias().subscribe(
      (data) => {
        console.log('Datos recibidos:', data);
        this.materia = data;

        // Filtrar las materias del profesor
        this.materiasDelProfesor = this.materia.filter(
          (m: MateriaCurso) => m.correo_profe === this.correoProfesor
        );

        localStorage.setItem('materiasDelProfesor', JSON.stringify(this.materiasDelProfesor));

        console.log('Materias del profesor:', this.materiasDelProfesor);
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );

    // Cargar los datos de los alumnos
    this.crudAPIService.getAlumno().subscribe(
      (data) => {
        this.alumnos = data; // Asumir que esto devuelve un array de objetos Alumno
      },
      (error) => {
        console.error('Error al obtener los alumnos:', error);
      }
    );
  }

  getStudentName(alumnoId: number): string {
    if (alumnoId == null) {
      console.log(alumnoId);
      return 'ID de alumno no válido'; // Mensaje en caso de que el ID sea null o undefined
    }

    // Comparar los ids como string para evitar errores de tipo
    const alumno = this.alumnos.find((a) => String(a.id) === String(alumnoId));
    return alumno ? `${alumno.nombre} ${alumno.apellido}` : 'Alumno no encontrado';
  }

  // Función para contar los días presentes por alumno
  contarAsistenciasPorAlumno(asistencias: any[]): { [key: number]: number } {
    const contador: { [key: number]: number } = {};
  
    asistencias.forEach((asistencia) => {
      if (asistencia.presente) {
        // Si el alumno está presente, sumamos uno a su contador
        contador[asistencia.alumno] = (contador[asistencia.alumno] || 0) + 1; // Cambiado a asistencia.alumno
      }
    });
  
    return contador;
  }
  
}
