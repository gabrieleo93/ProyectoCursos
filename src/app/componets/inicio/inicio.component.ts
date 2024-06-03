import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { TopBarComponent } from "../../layouts/top-bar/top-bar.component";
import { SliderComponent } from "../slider/slider.component";
import { TopBarInicioComponent } from "../../layouts/top-bar-inicio/top-bar-inicio.component";
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';


@Component({
    selector: 'app-inicio',
    standalone: true,
    templateUrl: './inicio.component.html',
    styleUrl: './inicio.component.css',
    imports: [RouterOutlet, TopBarComponent, SliderComponent, TopBarInicioComponent]
})
export class InicioComponent implements OnInit {

  rol: string=""

  mostrarBoton='ADMIN'

  constructor(
    private servicio: UserService,
    private router: Router,

  ){

  }
  ngOnInit(): void {

    // if(!this.servicio.estaLogueado){
    //   this.router.navigate(["/home/inicio"])
    // }
    this.servicio.esAdminObser.subscribe(
      nuevoValor=>{
        this.mostrarBoton=nuevoValor
      }
    )





  }










}
