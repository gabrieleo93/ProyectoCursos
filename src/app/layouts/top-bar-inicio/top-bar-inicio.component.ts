import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class TopBarInicioComponent implements OnInit, OnDestroy {
  mostrarBoton: boolean = false;
  nombreUsuario: string = '';
  private subscriptions: Subscription = new Subscription();

  constructor(
    private servicio: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuarioLogeado();

    this.subscriptions.add(
      this.servicio.esAdminObser.subscribe(rol => {
        this.mostrarBoton = (rol === 'ADMIN');
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  usuarioLogeado(): void {
    const currentUser = this.servicio.getCurrentUser();

    if (currentUser) {
      this.nombreUsuario = currentUser.nombreEmpleado;
    } else {
      this.nombreUsuario = '';
    }
  }

  onLogout(): void {
    this.servicio.logout();
    this.router.navigate(['/']); // Redirect to login or home page
  }
}
