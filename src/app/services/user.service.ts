import { Injectable, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../interfaces/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  private readonly baseUrl: string= environment.baseUrl

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  estaLogueado: boolean = false;
  private esAdmin: BehaviorSubject<string> = new BehaviorSubject<string>('USER');
  esAdminObser: Observable<string> = this.esAdmin.asObservable();

  // Información del usuario logueado
  userData: User = {
    id: '',
    nombreEmpleado: '',
    apellidosEmpleado: '',
    mailEmpleado: '',
    password: '',
    rol: 'USER'
  };

  ngOnInit(): void {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      this.userData = currentUser;
      this.estaLogueado = true;
      this.esAdmin.next(this.userData.rol);
    }
  }




  login(email: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.baseUrl}auth/login`, { email, password }).pipe(
      map(response => {
        if (response) {
          this.userData = response;
          this.estaLogueado = true;
          this.esAdmin.next(this.userData.rol);
          localStorage.setItem("currentUser", JSON.stringify(this.userData));
          return true;
        } else {
          this.resetUserData();
          return false;
        }
      })
    );
  }

  register(nombreEmpleado: string, apellidosEmpleado: string, mailEmpleado: string, password: string, confirmPassword: string): Observable<boolean> {
    if (password !== confirmPassword) {
      return new Observable(observer => observer.next(false));
    }

    const nuevoUsuario: User = {
      id: uuid(),
      nombreEmpleado,
      apellidosEmpleado,
      mailEmpleado,
      password,
      rol: 'USER'
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.baseUrl}auth/register`, nuevoUsuario, { headers });

  }


  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  getCurrentUser(): User | null {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  setCurrentUser(user: User | null): void {
    this.userData = user || {
      id: '',
      nombreEmpleado: '',
      apellidosEmpleado: '',
      mailEmpleado: '',
      password: '',
      rol: 'USER'
    };
    this.estaLogueado = !!user;
    this.esAdmin.next(this.userData.rol);
  }

  // getUserByMail(mail: string): User | null {
  //   const user = this.usuarios.find(usuario => usuario.mailEmpleado === mail);
  //   return user || null;
  // }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

  coonsultaUSer(): string | null {
    const usuariosString = localStorage.getItem('usuarios');
    if (usuariosString) {
      const usuarios: User[] = JSON.parse(usuariosString);
      const primerNombre = usuarios[0].nombreEmpleado;
      console.log(primerNombre);
    }
    return usuariosString;
  }

  private resetUserData(): void {
    this.userData = {
      id: '',
      nombreEmpleado: '',
      apellidosEmpleado: '',
      mailEmpleado: '',
      password: '',
      rol:''
    };
    this.estaLogueado = false;
    this.esAdmin.next('');
  }
}
