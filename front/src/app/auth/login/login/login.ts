import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
})
export class Login {
  url = 'http://localhost:8080/api/auth/login';

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

  get password() {
    return this.loginForm.controls.password;
  }
  get email() {
    return this.loginForm.controls.email;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const payload: LoginData = this.loginForm.getRawValue();

    this.loginUser(payload);
  }

  async loginUser(payload: LoginData) {
    try {
      const response = await fetch(this.url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status} with error: ${response.body}`);
      }

      const data = await response.json();

      console.log(data);
    } catch (error: any) {
      console.error('Full error:', error);
      console.error('Error status:', error.status);
      console.error('Error headers:', error.headers);
      console.error('Error body:', error.error);
    }
  }
}
