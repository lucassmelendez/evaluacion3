import { Component, OnInit } from '@angular/core';
import { ApiMateriasService } from 'src/app/servicios/api-materias.service';
import { MateriaCurso } from 'src/app/model/materias';

@Component({
  selector: 'app-cursos-informe',
  templateUrl: './cursos-informe.page.html',
  styleUrls: ['./cursos-informe.page.scss'],
})
export class CursosInformePage implements OnInit {

  materia: MateriaCurso[] = []; // Lista de materias obtenidas del API
  correoProfesor: string | null = ''; // Correo del profesor logueado
  materiasDelProfesor: MateriaCurso[] = []; // Materias filtradas según el profesor

  constructor(private apiMateriasService: ApiMateriasService) {}

  ngOnInit() {
    // Recupera el correo del profesor desde localStorage
    this.correoProfesor = localStorage.getItem('usuario');

    // Llama al API para obtener las materias
    this.apiMateriasService.getMaterias().subscribe(
      (data) => {
        console.log('Datos recibidos:', data);
        this.materia = data;

        // Filtra las materias que pertenecen al profesor logueado
        this.materiasDelProfesor = this.materia.filter(
          (m) => m.correo_profe === this.correoProfesor
        );

        console.log('Materias del profesor:', this.materiasDelProfesor);
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }
}
