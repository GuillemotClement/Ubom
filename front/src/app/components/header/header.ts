import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/core/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
})
// pour utiliser le ngOnInit, necessite d'implementer OnInit
export class Header {
  protected authService = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.authService.clearUser();
    this.router.navigate(['/']);
  }
}
