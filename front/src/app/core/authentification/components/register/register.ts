import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../config/environment.development';
import { Router } from '@angular/router';
import { handleError } from '../../../../_older/services/helpers/error.helper';
import { User } from '../../../services/auth.service';

interface RegisterForm {
  email: FormControl<string>;
  username: FormControl<string>;
  password: FormControl<string>;
}

interface RegisterData {
  email: string;
  username: string;
  password: string;
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
})
export class Register {
  switchMode = output<void>();

  goToLogin() {
    this.switchMode.emit();
  }

  // GESTION FORMULAIRE
  private cdr = inject(ChangeDetectorRef);
  private http = inject(HttpClient);
  private router = inject(Router);

  private registerUrl = `${environment.apiUrl}/users`;
  errorMessage: string | null = null;

  registerForm = new FormGroup<RegisterForm>({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  get password() {
    return this.registerForm.controls.password;
  }

  get username() {
    return this.registerForm.controls.username;
  }

  get email() {
    return this.registerForm.controls.email;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    const payload: RegisterData = this.registerForm.getRawValue();
    this.registerUser(payload);
  }

  async registerUser(payload: RegisterData) {
    this.errorMessage = null;
    this.cdr.detectChanges();

    this.http
      .post<User>(this.registerUrl, payload, {
        withCredentials: true,
      })
      .subscribe({
        next: () => {
          this.registerForm.reset();
          // this.router.navigate(['/login']);
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          if (err.status === 401) {
            this.errorMessage = 'Email ou mot de passe incorrect';
          } else {
            this.errorMessage = 'Erreur serveur, réessayer plus tard';
          }
          this.cdr.detectChanges();
          handleError(err, 'register');
        },
      });
  }
}
