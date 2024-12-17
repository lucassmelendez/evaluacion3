import { Component, OnInit } from '@angular/core';
import { CrudAPIService } from 'src/app/servicios/crud-api.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { MateriaCurso } from 'src/app/model/materias'; 
import { AsistenciaCurso } from 'src/app/model/materias';

@Component({
  selector: 'app-materia-alumn',
  templateUrl: './materia-alumn.page.html',
  styleUrls: ['./materia-alumn.page.scss'],
})
export class MateriaAlumnPage implements OnInit {
  materias: any[] = [];
  alumnoId: number | undefined;
  totalClases: number = 20; // Cambia este valor según lo que necesites

  constructor(
    private crudAPIService: CrudAPIService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.alumnoId = this.authService.getCurrentAlumnoId(); // Obtén el alumnoId automáticamente
    console.log('Alumno ID:', this.alumnoId); // Asegúrate de que el alumnoId sea correcto
    this.loadMateriasConAsistencias();
  }

  loadMateriasConAsistencias() {
    this.crudAPIService.getMateriasConAsistencias().subscribe(
      (data: MateriaCurso[]) => {
        console.log('Datos recibidos de la API:', data); // Verifica que la API envía los datos esperados
        this.materias = data.map(materia => {
          const asistenciaDelAlumno = materia.asistencias.find(
            asistencia => asistencia.alumno_id === this.alumnoId
          );
  
          return {
            ...materia,
            asistenciaAlumno: asistenciaDelAlumno ? asistenciaDelAlumno.asistencia : 0
          };
        });
        console.log('Materias con asistencia:', this.materias); // Verifica cómo quedan las materias
      },
      (error) => {
        console.error('Error al cargar materias:', error);
      }
    );
  }
  
  
  

  getAttendanceCount(asistencias: AsistenciaCurso[]): number {
    return asistencias.reduce((total, asistencia) => total + Number(asistencia.asistencia), 0);
  }

  getAttendancePercentage(diasAsistencia: number): number {
    return this.totalClases > 0 ? (diasAsistencia / this.totalClases) * 100 : 0;
  }
}

