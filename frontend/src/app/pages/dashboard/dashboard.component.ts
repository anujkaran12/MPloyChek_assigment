import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccessRecord } from '../../models/record.model';
import { AppUser } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { RecordsService } from '../../services/records.service';
import { UsersService } from '../../services/users.service';
import { UserUpdateForm } from '../../types/user-update-form.type';

const emptyUserForm: UserUpdateForm = {
  name: '',
  role: 'General User',
  department: 'Operations',
  status: 'Active'
};

const recordsApiDelayMs = 2000;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private recordsService = inject(RecordsService);
  private usersService = inject(UsersService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  currentUser: AppUser | null = null;
  records: AccessRecord[] = [];
  users: AppUser[] = [];
  accessLevel = '';
  editingUserId = '';
  isLoadingRecords = false;
  isLoadingUsers = false;
  recordError = '';
  userError = '';

  userForm = this.formBuilder.nonNullable.group({
    name: [emptyUserForm.name, [Validators.required]],
    role: [emptyUserForm.role, [Validators.required]],
    department: [emptyUserForm.department, [Validators.required]],
    status: [emptyUserForm.status, [Validators.required]]
  });

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    this.loadRecords();

    if (this.isAdmin) {
      this.loadUsers();
    }
  }

  get isAdmin(): boolean {
    return this.currentUser?.role === 'Admin';
  }

  loadRecords(): void {
    this.isLoadingRecords = true;
    this.recordError = '';

    this.recordsService.getRecords(recordsApiDelayMs).subscribe({
      next: (response) => {
        this.records = response.records;
        this.accessLevel = response.accessLevel;
        this.isLoadingRecords = false;
      },
      error: (error) => {
        this.recordError = error.error?.message || 'Unable to load records.';
        this.isLoadingRecords = false;
      }
    });
  }

  loadUsers(): void {
    this.isLoadingUsers = true;
    this.userError = '';

    this.usersService.getUsers().subscribe({
      next: (response) => {
        this.users = response.users;
        this.isLoadingUsers = false;
      },
      error: (error) => {
        this.userError = error.error?.message || 'Unable to load users.';
        this.isLoadingUsers = false;
      }
    });
  }

  saveUser(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    if (!this.editingUserId) {
      this.userError = 'Select a user from the table before saving changes.';
      return;
    }

    this.usersService.updateUser(this.editingUserId, this.userForm.getRawValue()).subscribe({
      next: () => {
        this.cancelEdit();
        this.loadUsers();
      },
      error: (error) => {
        this.userError = error.error?.message || 'Unable to save user.';
      }
    });
  }

  startEdit(user: AppUser): void {
    this.editingUserId = user.id;
    this.userForm.setValue({
      name: user.name,
      role: user.role,
      department: user.department,
      status: user.status
    });
  }

  cancelEdit(): void {
    this.editingUserId = '';
    this.userForm.setValue(emptyUserForm);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
