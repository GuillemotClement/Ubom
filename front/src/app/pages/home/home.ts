import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
})
export class Home {
  isRegister = false;

  toggleForm(){
    this.isRegister = !this.isRegister
  }
}
