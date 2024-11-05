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
    this.loadMateriasConAsistencias();
  }

  loadMateriasConAsistencias() {
    this.crudAPIService.getMateriasConAsistencias().subscribe(
      (data: MateriaCurso[]) => {
        console.log('Materias cargadas:', data);
        this.materias = data.map(materia => {
          // Filtra las asistencias por el alumnoId
          const asistenciasPorAlumno = materia.asistencias.filter(asistencia => asistencia.alumno_id === this.alumnoId);

          // Devuelve la materia con las asistencias del alumno específico
          return { ...materia, asistenciasPorAlumno };
        });
      },
      (error) => {
        console.error('Error al cargar materias:', error);
      }
    );
  }

  getAttendanceCount(asistencias: AsistenciaCurso[]): number {
    return asistencias.filter(asistencia => asistencia.asistencia).length;
  }

  getAttendancePercentage(asistencias: AsistenciaCurso[]): number {
    const diasPresentes = this.getAttendanceCount(asistencias);
    return this.totalClases > 0 ? (diasPresentes / this.totalClases) * 100 : 0;
  }
}

