import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { InicioComponent } from '../../componets/inicio/inicio.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-top-bar-inicio',
  standalone: true,
  imports: [RouterOutlet, InicioComponent],
  templateUrl: './top-bar-inicio.component.html',
  styleUrls: ['./top-bar-inicio.component.css']
})
export class TopBarInicioComponent implements OnInit {
  mostrarBoton: string = 'ADMIN';
  nombreUsuario: string = '';
  private subscriptions: Subscription = new Subscription();

  constructor(
    private servicio: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuarioLogeado();

    this.subscriptions.add(
      this.servicio.esAdminObser.subscribe(isAdmin => {
        this.mostrarBoton = isAdmin;
      })
    );
  }

  onLogout(): void {
    this.servicio.logout();
    this.router.navigate(['/']); // Redirect to login or home page
  }

  usuarioLogeado(): void {
    const currentUser = this.authService.getCurrentUser();
    this.nombreUsuario = currentUser ? currentUser.nombre : '';
    this.servicio.setCurrentUser(currentUser);
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
