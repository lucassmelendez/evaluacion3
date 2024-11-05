import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClaseService {
  private totalClasesSubject = new BehaviorSubject<number>(0); // Inicializa en 0
  totalClases$ = this.totalClasesSubject.asObservable();

  incrementarClases() {
    // Incrementa el valor en el BehaviorSubject
    const currentTotal = this.totalClasesSubject.value;
    this.totalClasesSubject.next(currentTotal + 1); // Aumenta el total de clases
  }

  getTotalClases(): number {
    return this.totalClasesSubject.value;
  }
}
