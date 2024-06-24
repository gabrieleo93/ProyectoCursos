import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { TopBarComponent } from "../../layouts/top-bar/top-bar.component";
import { SliderComponent } from "../slider/slider.component";
import { TopBarInicioComponent } from "../../layouts/top-bar-inicio/top-bar-inicio.component";
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { CursosComponent } from '../cursos/cursos.component';
import { CursosService } from '../../services/cursos.service';
import { Cursos } from '../../interfaces/cursos';


@Component({
    selector: 'app-inicio',
    standalone: true,
    templateUrl: './inicio.component.html',
    styleUrl: './inicio.component.css',
    imports: [RouterOutlet, TopBarComponent, SliderComponent, TopBarInicioComponent, CursosComponent]
})
export class InicioComponent implements OnInit {

  rol: string=""
  public cursos: Cursos[]=[]
  mostrarBoton='ADMIN'

  constructor(
    private servicio: UserService,
    private cursosServices: CursosService


  ){

  }
  ngOnInit(): void {

    // if(!this.servicio.estaLogueado){
    //   this.router.navigate(["/home/inicio"])
    // }
    this.servicio.esAdminObser.subscribe({
      next: nuevoValor => {
        this.mostrarBoton = nuevoValor;
      }
      });

    this.cursosServices.listar()
    .subscribe(curso=>this.cursos=curso)



  }










}
