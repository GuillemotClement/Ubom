import { Component, inject, signal } from '@angular/core';
import { Login } from '../../components/auth/login/login';
import { Register } from '../../components/auth/register/register';
import { AuthService } from '../../services/core/auth.service';

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
