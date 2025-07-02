import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const AdminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.userSignal();
  const isAdmin = user?.authorization?.includes('ADMIN') ?? false;

  if (!isAdmin) {
    router.navigate(['/']);
    return false;
  }

  return true;
}