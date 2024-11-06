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

        this.materiasDelProfesor = this.materia.filter(
          (m) => m.correo_profe === this.correoProfesor
        );

        localStorage.setItem('materiasDelProfesor', JSON.stringify(this.materiasDelProfesor));

        console.log('Materias del profesor:', this.materiasDelProfesor);
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );

    // Load student data
    this.crudAPIService.getAlumno().subscribe(
      (data) => {
        this.alumnos = data; // Assume this returns an array of Alumno objects
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

    const alumno = this.alumnos.find(a => Number(a.id) === Number(alumnoId)); // Convierte ambos valores a número
    return alumno ? `${alumno.nombre} ${alumno.apellido}` : 'Alumno no encontrado';
    
    
  }
}
