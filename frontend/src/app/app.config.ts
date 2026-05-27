import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AuthService } from './services/auth.service';
import { authInterceptor } from './interceptors/auth.interceptor';

function loadSession(authService: AuthService): () => Promise<void> {
  return () => authService.restoreSession();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: loadSession,
      deps: [AuthService],
      multi: true
    }
  ]
};
