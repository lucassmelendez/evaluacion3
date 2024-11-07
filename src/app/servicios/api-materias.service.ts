import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { MateriaCurso } from '../model/materias';
import { AsistenciaCurso } from 'src/app/model/materias';


@Injectable({
  providedIn: 'root'
})
export class ApiMateriasService {
  private apiUrl = "https://cartadesuicidio.pythonanywhere.com/api/materias/";
private api = "https://cartadesuicidio.pythonanywhere.com/api";

  constructor(private http: HttpClient) { }

  getMaterias(): Observable<any> {
    return this.http.get<any>(this.apiUrl); // Usa la misma URL para obtener materias
  }

  getTotalClases(materiaId: number): Observable<MateriaCurso> {
    return this.http.get<MateriaCurso>(`${this.apiUrl}${materiaId}/`); // Usa apiUrl aquí también
  }

  actualizarAsistencia(asistenciaData: any): Observable<any> {
    return this.http.post(`${this.api}/asistencias/`, asistenciaData);
  }

  
}
