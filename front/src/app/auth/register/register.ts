import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// interface pour typer les valeurs du formulaire
export interface RegisterForm {
  email: FormControl<string>;
  username: FormControl<string>;
  password: FormControl<string>;
}

// interface pour typer les valeurs envoyer au backend
export interface RegisterData {
  email: string;
  username: string;
  password: string;
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
})
export class Register {
  url = 'http://localhost:8080/api/users';

  // construction du formulaire
  registerForm = new FormGroup<RegisterForm>({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [(Validators.required, Validators.minLength(6))],
    }),
  });

  // utiliser dans le formulaire pour recupérer la valeur saisis dans le formulaire et afficher les erreurs
  get username() {
    return this.registerForm.controls.username;
  }
  get password() {
    return this.registerForm.controls.password;
  }
  get email() {
    return this.registerForm.controls.email;
  }

  // fonction qui catch les submit du formulaire
  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const payload: RegisterData = this.registerForm.getRawValue();

    this.registerUser(payload);
  }

  // fonction qui fait l'appel vers le backend pour inscrire un user
  async registerUser(payload: RegisterData) {
    try {
      const response = await fetch(this.url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status} with error: ${response.body}`);
      }

      const data = await response.json();

      console.log(data);
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
