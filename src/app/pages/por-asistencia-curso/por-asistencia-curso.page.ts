import { Component, OnInit } from '@angular/core';
import { MateriaCurso } from 'src/app/model/materias'; 
import { ApiMateriasService } from 'src/app/servicios/api-materias.service';

@Component({
  selector: 'app-por-asistencia-curso',
  templateUrl: './por-asistencia-curso.page.html',
  styleUrls: ['./por-asistencia-curso.page.scss'],
})
export class PorAsistenciaCursoPage implements OnInit {
  materia: MateriaCurso[] = [];
  alumnosPorMateria: any[] = [];
  materiasDelProfesor: MateriaCurso[] = [];
  correoProfesor: string | null = '';

  constructor(
    private apiMateriasService: ApiMateriasService,
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
  }


}
