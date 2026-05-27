import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { AppUser, LoginResponse } from '../models/user.model';
import { UserRole } from '../types/user.types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly currentUserSubject = new BehaviorSubject<AppUser | null>(null);

  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  get currentUser(): AppUser | null {
    return this.currentUserSubject.value;
  }

  login(userId: string, password: string, role: UserRole) {
    return this.http.post<LoginResponse>('/api/auth/login', { userId, password, role }, { withCredentials: true });
  }

  saveLogin(response: LoginResponse): void {
    this.currentUserSubject.next(response.user);
  }

  async restoreSession(): Promise<void> {
    try {
      const response = await firstValueFrom(this.http.get<{ user: AppUser }>('/api/auth/me', { withCredentials: true }));
      this.currentUserSubject.next(response.user);
    } catch {
      this.currentUserSubject.next(null);
    }
  }

  logout(): void {
    this.http.post('/api/auth/logout', {}, { withCredentials: true }).subscribe();
    this.currentUserSubject.next(null);
  }
}
