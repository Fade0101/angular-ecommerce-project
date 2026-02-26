import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    const requiredRole = route.data['role'];
    if (requiredRole && requiredRole !== authService.getRole()) {
      router.navigate(['/']); 
      return false;
    }
    return true;
  }

  router.navigate(['/login']);
  return false;
};