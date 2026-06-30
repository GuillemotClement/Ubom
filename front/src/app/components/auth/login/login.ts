import { Component, output } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
})
export class Login {
  switchMode = output<void>();

  goToRegister(){
    this.switchMode.emit();
  }
}
