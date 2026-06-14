import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const snack = inject(MatSnackBar);
  if (auth.isAdmin()) return true;
  snack.open('Access denied', 'Close', { duration: 3000 });
  return router.createUrlTree(['/']);
};