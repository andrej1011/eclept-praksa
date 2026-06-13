import { ApplicationConfig, provideAppInitializer, inject } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { AuthService } from './core/services/auth.service';
import { provideNativeDateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAppInitializer(async () => {
      await inject(AuthService).restoreSession();
    }),
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'sr-Latn-RS' },// SR date = DD.MM.YYYY with dots
  ],
};