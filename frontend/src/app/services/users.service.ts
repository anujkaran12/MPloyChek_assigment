import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUser } from '../models/user.model';
import { UserUpdateForm } from '../types/user-update-form.type';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<{ users: AppUser[] }>('/api/users');
  }

  updateUser(id: string, user: UserUpdateForm) {
    return this.http.put<{ user: AppUser }>(`/api/users/${id}`, user);
  }
}
