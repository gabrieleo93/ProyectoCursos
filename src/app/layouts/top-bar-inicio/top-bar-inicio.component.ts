import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { InicioComponent } from '../../componets/inicio/inicio.component';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-top-bar-inicio',
  standalone: true,
  imports: [RouterOutlet, InicioComponent],
  templateUrl: './top-bar-inicio.component.html',
  styleUrl: './top-bar-inicio.component.css'
})
export class TopBarInicioComponent implements OnInit{
  mostrarBoton=false
  constructor(
    private servicio: UserService,

    private router: Router,
  ){}

  ngOnInit(): void {

    // if(!this.servicio.estaLogueado){
    //   this.router.navigate(["/home/inicio"])
    // }
    this.usuarioLogeado()

    this.servicio.esAdminObser.subscribe(
      nuevoValor=>{
        this.mostrarBoton=nuevoValor
      }
    )

  }
  onLogout(): void {
    this.servicio.logout();
  }




  usuarioLogeado(){
    let saludo = this.servicio.coonsultaUSer()

    return saludo;
  }

}
