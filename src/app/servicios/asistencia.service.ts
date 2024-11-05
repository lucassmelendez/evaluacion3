// asistencia.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AsistenciaService {
  private correosEscaneados = new BehaviorSubject<string[]>([]);
  correosEscaneados$ = this.correosEscaneados.asObservable();

  actualizarCorreosEscaneados(correos: string[]) {
    this.correosEscaneados.next(correos);
  }
}
