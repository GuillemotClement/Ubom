import { Component, output } from '@angular/core';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.html',
})
export class Register {
  switchMode = output<void>();


  goToLogin(){
    this.switchMode.emit();
  }
}
