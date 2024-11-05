import { Component, OnInit } from '@angular/core';
import { ApiMateriasService } from 'src/app/servicios/api-materias.service'; // Importa el servicio
import { MateriaCurso } from 'src/app/model/materias'; // Importa la interfaz Materias
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-cursos-qr',
  templateUrl: './cursos-qr.page.html',
  styleUrls: ['./cursos-qr.page.scss'],
})
export class CursosQRPage implements OnInit {

  materia: MateriaCurso[] = []; // Almacena todas las materias
  correoProfesor: string | null = ''; // Correo del profesor logueado
  materiasDelProfesor: MateriaCurso[] = []; // Materias filtradas del profesor

  constructor(private apiMateriasService: ApiMateriasService,
              private router: Router
  ) {}

  ngOnInit() {
    // Recuperar el correo del profesor desde localStorage
    this.correoProfesor = localStorage.getItem('usuario');

    // Obtener las materias del API
    this.apiMateriasService.getMaterias().subscribe(
      (data) => {
        console.log('Datos recibidos:', data);
        this.materia = data;

        // Filtrar las materias del profesor logueado
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
  generarQrParaCurso(cursoId: string,cursoName: string) {
    localStorage.setItem('cursoIdSeleccionado', cursoId);
    localStorage.setItem('nombreCurso', cursoName);
    this.router.navigate(['/qr-profe']); // Navega al componente QR
  }
}
