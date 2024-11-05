// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getUser();

    if (user) {
      if (user.role === 'profesor') {
        return true; // Permitir acceso si el rol es profesor
      } else {
        this.router.navigate(['/home-alumno']); // Redirigir al home de alumno si el rol es alumno
        return false;
      }
    } else {
      this.router.navigate(['/login']); // Redirigir al login si no está autenticado
      return false;
    }
  }
}
