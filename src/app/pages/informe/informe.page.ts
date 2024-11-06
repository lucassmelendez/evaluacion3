import { Component, OnInit } from '@angular/core';
import { MateriaCurso } from 'src/app/model/materias';
import { ApiMateriasService } from 'src/app/servicios/api-materias.service';
import { AlertController } from '@ionic/angular';
import { CrudAPIService } from 'src/app/servicios/crud-api.service';
import { Alumno } from 'src/app/model/alumno'; 


@Component({
  selector: 'app-informe',
  templateUrl: './informe.page.html',
  styleUrls: ['./informe.page.scss'],
})
export class InformePage implements OnInit {
  alumnos: Alumno[] = [];
  materia: MateriaCurso[] = [];
  materiasDelProfesor: MateriaCurso[] = [];
  totalClases: number = 0;
  correoProfesor: string | null = '';

  constructor(
    private alertController: AlertController,
    private crudAPIService: CrudAPIService,
    private ApiMateriasService:ApiMateriasService
  ) {}

  ngOnInit() {
    this.correoProfesor = localStorage.getItem('usuario');

    this.ApiMateriasService.getMaterias().subscribe(
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
  
  contarAsistenciasPorAlumno(asistencias: any[]): { [key: string]: number } {
    const contador: { [key: string]: number } = {}; // Cambiar el tipo de clave a string

    // Contar todas las asistencias, incluso las que son false
    this.alumnos.forEach((alumno) => {
      if (alumno.id !== undefined) {  // Verificar que el ID del alumno no sea undefined
        // Filtrar las asistencias del alumno
        const asistenciasDelAlumno = asistencias.filter(
          (asistencia) => asistencia.alumno === alumno.id
        );

        // Si el alumno tiene asistencias, contar los días presentes
        const diasPresentes = asistenciasDelAlumno.filter((asistencia) => asistencia.presente).length;

        // Si el alumno no tiene ningún día presente, asignar 0
        contador[String(alumno.id)] = diasPresentes > 0 ? diasPresentes : 0; // Usar String() para asegurar el tipo
      }
    });

    return contador;
  }
  
  getUniqueAlumnos(asistencias: any[]): number[] {
    const alumnosUnicos = new Set<number>();
    asistencias.forEach((asistencia) => {
      alumnosUnicos.add(asistencia.alumno);
    });
    return Array.from(alumnosUnicos);
  }
  
  public alertButtons = [
    {
      text: 'PDF',
      role: 'pdf',
      handler: () => {
        this.mostrarPDF();
      },
    },

    {
      text: 'CANCELAR',
      role: 'cancel',
      handler: () => {
        console.log('cancelar')
      },
    },
  ];

  async alertaPDF() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Descarga en formato PDF exitosa',
      buttons: ['OK'],
    });
    await alert.present();
  }

  mostrarPDF() {
    this.crudAPIService.getAlumnoPDF().subscribe(
      (pdfBlob) => {
        
        const blobUrl = window.URL.createObjectURL(pdfBlob);
        const anchor = document.createElement('a');
        anchor.href = blobUrl;
        anchor.download = 'informe_alumnos.pdf';
        anchor.click();

        
        window.URL.revokeObjectURL(blobUrl);

        
        this.alertaPDF();
      },
      (error) => {
        console.error('Error al descargar el PDF:', error);
      }
    );
  }
  
  getAttendancePercentage(asistencia: number): string {
    if (this.totalClases === 0) return '0%';
    const percentage = (asistencia / this.totalClases) * 100;
    return percentage.toFixed(2) + '%';
  }
}
