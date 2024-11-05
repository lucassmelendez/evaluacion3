import { Component, OnInit } from '@angular/core';
import { ApiMateriasService } from 'src/app/servicios/api-materias.service';
import { MateriaCurso } from 'src/app/model/materias';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.page.html',
  styleUrls: ['./cursos-lista.page.scss'],
})
export class CursosListaPage implements OnInit {

  materia: MateriaCurso[] = []; // Lista de todas las materias obtenidas del API
  correoProfesor: string | null = ''; // Correo del profesor logueado
  materiasDelProfesor: MateriaCurso[] = []; // Materias asociadas al profesor

  constructor(private apiMateriasService: ApiMateriasService) {}

  ngOnInit() {
    // Recuperar el correo del profesor desde localStorage
    this.correoProfesor = localStorage.getItem('usuario');

    // Obtener las materias desde el API
    this.apiMateriasService.getMaterias().subscribe(
      (data) => {
        console.log('Datos recibidos:', data);
        this.materia = data;

        // Filtrar las materias que correspondan al profesor logueado
        this.materiasDelProfesor = this.materia.filter(
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
}
