import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, User } from '../../services/core/auth.service';
import { Router } from '@angular/router';
import { handleError } from '../../services/helpers/error.helper';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

export interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface LoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
})
export class Login {
  // injection du service auth
  private authService = inject(AuthService);
  // injection du router pour la redirection
  private router = inject(Router);
  // pour update du tempate avec async
  private cdr = inject(ChangeDetectorRef);
  // gestion des requete => like axios
  private http = inject(HttpClient);

  errorMessage: string | null = null;
  private readonly API_URL = 'http://localhost:8080/api/auth/login';

  // construction du formulaire
  loginForm = new FormGroup<LoginForm>({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [(Validators.required, Validators.minLength(6))],
    }),
  });

  // getter pour passer les valeurs dans le formulaire HTML
  get password() {
    return this.loginForm.controls.password;
  }
  get email() {
    return this.loginForm.controls.email;
  }

  // fonction déclenmcher au submit du formulaire
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const payload: LoginData = this.loginForm.getRawValue();
    this.loginUser(payload);
  }

  // fonction qui fait la requête vers le backend
  async loginUser(payload: LoginData) {
    this.errorMessage = null;
    this.cdr.detectChanges();

    this.http
      .post<User>(this.API_URL, payload, {
        withCredentials: true,
      })
      .subscribe({
        next: (user) => {
          console.log('Login success: ', user);
          this.authService.setUser(user);
          this.router.navigate(['/']);
          this.loginForm.reset();
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.errorMessage = 'Email ou mot de passe incorrect';
          } else {
            this.errorMessage = 'Erreur serveur, réessayer plus tard';
          }
          this.cdr.detectChanges(); // update template pour afficher le message d'erreur
          handleError(err, 'Login');
        },
      });
  }
}
