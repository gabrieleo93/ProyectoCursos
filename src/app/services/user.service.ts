import { Injectable, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService  implements OnInit{

  constructor(private router: Router,) { }

  estaLogueado: boolean= false
  private esAdmin:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false)
  esAdminObser: Observable<boolean>= this.esAdmin.asObservable()
//informacion del usuario logueado
  userData: User={
    id:'',
    nombre: '',
    apellido: '',
    mail: '',
    password: '',
    tipo:'',
    rol:false
  }

  ngOnInit(): void {
    let usuarios = localStorage.getItem("currentUser")
    if(usuarios!=null){
     const arrayUser:User[]=JSON.parse(usuarios).usuariosJson

      this.usuarios= arrayUser
    }
    this.coonsultaUSer()

  }
//simulamos base de datos
  usuarios:User[]=[
    {
      id: uuid(),
      nombre: 'admin',
      apellido: 'admin',
      mail: 'admin@admin.com',
      password: 'admin',
      tipo:'fronted',
      rol:false
    },
    {
      id: uuid(),
      nombre: 'admin2',
      apellido: 'admin',
      mail: 'admin2@admin.com',
      password: 'admin2',
      tipo:'backend',
      rol:false
    },
    {
      id: uuid(),
      nombre: 'admin3',
      apellido: 'admin3',
      mail: 'admin3@admin.com',
      password: 'admin3',
      tipo:'backend',
      rol:true
    },
    {
      id: uuid(),
      nombre: 'admin4',
      apellido: 'admin4',
      mail: 'admin4@admin.com',
      password: 'admin4',
      tipo:'analista',
      rol:false
    }
  ]

  login(nombreUsuario: string, password: string): boolean{

    for (let i = 0; i < this.usuarios.length; i++) {
      if( nombreUsuario== this.usuarios[i].mail ){
        if(password==this.usuarios[i].password){
          this.userData=this.usuarios[i]
          this.esAdmin.next(this.userData.rol!)
          this.estaLogueado=true
          const usuaruioLogueado={
            usuariosJson: this.usuarios[i]
          }
          localStorage.setItem("currentUser",JSON.stringify(usuaruioLogueado))

          //this.estaLogueado=true

          return true


        }

      }
    }
    //limpiamos con un usuario vacio
    this.userData= {
      id:'',
      nombre: '',
      apellido: '',
      mail: '',
      password: '',
      tipo:'',
      rol:false
    }
    return false


  }


 registrer(nombreUsuario:string, apellido:string, mail: string, password:string, confirmPassword:string,   tipo: string): Boolean{
  if(password!=confirmPassword){
    console.log("0")
    return false
  }
  let seCumple= false
  this.usuarios.forEach(usuario=> {
    if(usuario.mail==mail){
      seCumple =true
      console.log('ya existe un usuario con este correo')

    }
  });

  if(seCumple){
    console.log("1")
    return false
  }

  const nuevoUsuario: User={
    id:uuid(),
    nombre: nombreUsuario,
    apellido: apellido,
    mail: mail,
    password: password,
    tipo:tipo,
    rol:false

  }

  this.usuarios.push(nuevoUsuario);

  const objetoUsuario={
    usuariosJson: this.usuarios
  }
  localStorage.setItem("currentUser",JSON.stringify(objetoUsuario))

  return true


 }
 isLoggedIn(): boolean {
  return localStorage.getItem('currentUser') !== null;
}

getCurrentUser(): any {
  return JSON.parse(localStorage.getItem('currentUser') || '{}');
}

 getUserByMail(): string | null {
  const currentUser = this.getCurrentUser();
  return currentUser  ?currentUser.mail : null;
}
logout(): void {
  localStorage.removeItem('currentUser');
  this.router.navigate(['']);
}


coonsultaUSer():string | null{
  const usuariosString = localStorage.getItem('usuarios');

    if (usuariosString) {
        const usuarios: User[] = JSON.parse(usuariosString);
        const primerNombre = usuarios[0].nombre;
        console.log(primerNombre);
    }
    return usuariosString
}

}
