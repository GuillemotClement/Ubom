import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, User } from '../../../services/core/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { handleError } from '../../../services/helpers/error.helper';

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

interface LoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
})
export class Login {
  // GESTION DU SWITCH 
  switchMode = output<void>();

  goToRegister(){
    this.switchMode.emit();
  }

  // GESTION DU FORMULAIRE
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private http = inject(HttpClient);

  private loginUrl = `${environment.apiUrl}/auth/login`;
  errorMessage: string | null = null;
  
  loginForm = new FormGroup<LoginForm>({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)]
    })
  })

  get password(){
    return this.loginForm.controls.password
  }

  get email(){
    return this.loginForm.controls.email
  }

  onSubmit(){
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }
    const payload: LoginData = this.loginForm.getRawValue();
    this.loginUser(payload);
  }

  async loginUser(payload: LoginData){
    this.errorMessage = null;
    this.cdr.detectChanges();

    this.http
      .post<User>(this.loginUrl, payload, {
        withCredentials: true
      })
      .subscribe({
        next: (user) => {
          console.log("user logged: ", user);
          this.authService.setUser(user);
          this.loginForm.reset();
          // this.router.navigate(['/']);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.errorMessage = 'Email ou mot de passe incorrect';
          } else {
            this.errorMessage = 'Erreur serveur, réessayer plus tard';
          }
          this.cdr.detectChanges(); // update template pour afficher le message d'erreur
          handleError(err, 'Login');
        }
      })
  }
}
