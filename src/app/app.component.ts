import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from "./layouts/top-bar/top-bar.component";
import { LoginComponent } from "./componets/login/login.component";
import { AuthService } from './services/auth.service';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, TopBarComponent, LoginComponent]
})
export class AppComponent {
  title = 'ProyectoCurso';

  constructor(
    private authService: AuthService
  ){}
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      console.log('User is logged in');
      // Realiza las acciones necesarias si el usuario está autenticado
    }
  }
}
