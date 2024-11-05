import { MateriaCurso } from 'src/app/model/materias';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Alumno,Profesor } from '../model/alumno'; // Importar las interfaces necesarias

@Injectable({
  providedIn: 'root'
})
export class CrudAPIService {
  private rutaApiAlumno = "http://127.0.0.1:8000/api/alumno/";
  private rutaIncrementarAsistencia = "http://127.0.0.1:8000/api/incrementar_asistencia/";
  private rutaAsistenciasPorMateria = "http://127.0.0.1:8000/api/asistencias_por_materia/";
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private firestore: AngularFirestore) {}

  // Métodos de interacción con la API
  getAlumno(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.rutaApiAlumno);
  }

  incrementarAsistencia(data: { correo: string }): Observable<any> {
    return this.http.post(this.rutaIncrementarAsistencia, data);
  }

  getAlumnoPDF(): Observable<Blob> {
    return this.http.get(`${this.rutaApiAlumno}pdf/`, { responseType: 'blob' });
  }

  getMateriasConAsistencias(): Observable<MateriaCurso[]> {
    return this.http.get<MateriaCurso[]>(`${this.apiUrl}/asistencias_por_materia`);
  }



  // Métodos de interacción con Firestore

  // CRUD para Alumnos en Firestore
  agregarAlumnoFirestore(alumno: Alumno): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection('alumnos').doc(id).set(alumno);
  }

  obtenerAlumnoFirestore(id: string): Observable<Alumno | undefined> {
    return this.firestore.collection('alumnos').doc<Alumno>(id).valueChanges();
  }

  actualizarAlumnoFirestore(id: string, alumno: Alumno): Promise<void> {
    return this.firestore.collection('alumnos').doc(id).update(alumno);
  }

  eliminarAlumnoFirestore(id: string): Promise<void> {
    return this.firestore.collection('alumnos').doc(id).delete();
  }

  // CRUD para Profesores en Firestore
  agregarProfesorFirestore(profesor: Profesor): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection('profesores').doc(id).set(profesor);
  }

  obtenerProfesorFirestore(id: string): Observable<Profesor | undefined> {
    return this.firestore.collection('profesores').doc<Profesor>(id).valueChanges();
  }

  actualizarProfesorFirestore(id: string, profesor: Profesor): Promise<void> {
    return this.firestore.collection('profesores').doc(id).update(profesor);
  }

  eliminarProfesorFirestore(id: string): Promise<void> {
    return this.firestore.collection('profesores').doc(id).delete();
  }

  // CRUD para Materias en Firestore
  agregarMateriaFirestore(materia: MateriaCurso): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection('materias').doc(id).set(materia);
  }

  obtenerMateriaFirestore(id: string): Observable<MateriaCurso | undefined> {
    return this.firestore.collection('materias').doc<MateriaCurso>(id).valueChanges();
  }

  actualizarMateriaFirestore(id: string, materia: MateriaCurso): Promise<void> {
    return this.firestore.collection('materias').doc(id).update(materia);
  }

  eliminarMateriaFirestore(id: string): Promise<void> {
    return this.firestore.collection('materias').doc(id).delete();
  }

  // Registro de asistencia en una materia específica para un alumno
  registrarAsistencia(alumnoId: string, materiaId: string, fecha: string, presente: boolean): Promise<void> {
    const asistenciaRef = this.firestore
      .collection('alumnos')
      .doc(alumnoId)
      .collection('materias')
      .doc(materiaId)
      .collection('asistencias')
      .doc(fecha);

    return asistenciaRef.set({ presente });
  }

  // Incrementar asistencia en Firestore
  actualizarAsistenciaEnFirestore(studentId: string, asistencia: number): Promise<void> {
    return this.firestore.collection('alumnos').doc(studentId).update({ asistencia });
  }

  
}
