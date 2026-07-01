import { Component, inject, signal } from '@angular/core';
import { Register } from '../../../core/authentification/components/register/register';
import { Login } from '../../../core/authentification/components/login/login';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-home',
  imports: [Login, Register],
  templateUrl: './home.html',
})
export class Home {
  // création d'un signal
  // sa valeur initial est true
  // correspond à une variable réactive
  // isLogin() => permet de lire la valeur
  isLogin = signal(true);

  // déclaration d'une méthode appelée lorsque l'on veux changer d'écran
  toggleAuthMode() {
    // permet de toggle la valeur de la variable
    this.isLogin.update((value) => !value);
  }

  // méthode qui reçoit la valeur envoyée par un composant enfant (login ou register)
  setAuthMode(isLogin: boolean) {
    this.isLogin.set(isLogin);
  }

  protected authService = inject(AuthService);
}
