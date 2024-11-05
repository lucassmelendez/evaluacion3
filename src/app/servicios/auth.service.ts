import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: { email: string; role: string; alumnoId?: number } | null = null;

  constructor(private router: Router) {}

  login(email: string) {
    this.user = {
      email,
      role: this.getUserRole(email),
      alumnoId: this.getAlumnoId(email), // Obtén el alumnoId según el email
    };
    // Otras operaciones de inicio de sesión
  }

  logout() {
    this.user = null;
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.user !== null;
  }

  getUserRole(email: string): string {
    if (email.endsWith('@duocuc.cl')) {
      return 'alumno';
    } else if (email.endsWith('@profesor.duoc.cl')) {
      return 'profesor';
    }
    return 'invitado';
  }

  getUser(): { email: string; role: string; alumnoId?: number } | null {
    return this.user;
  }

  // Cambiar la visibilidad a public
  public getAlumnoId(email: string): number | undefined {
    // Lógica para obtener el alumnoId basado en el email
    if (email.endsWith('@duocuc.cl')) {
      return 23; // Suponiendo que el alumno con este email tiene ID 23
    }
    return undefined;
  }

  // Método que retorna el alumnoId del usuario actual
  public getCurrentAlumnoId(): number | undefined {
    return this.user?.alumnoId;
  }
}
