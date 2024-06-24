import { Injectable } from '@angular/core';
import { Empleado } from '../interfaces/empleado';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../interfaces/enviroment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private router: Router, private http: HttpClient) {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      this.setCurrentUser(currentUser);
    }
  }

  estaLogueado: boolean = false;
  private esAdmin: BehaviorSubject<string> = new BehaviorSubject<string>('USER');
  esAdminObser: Observable<string> = this.esAdmin.asObservable();

  userData: Empleado = {
    nombreEmpleado: '',
    apellidosEmpleado: '',
    emailEmpleado: '',
    password: '',
    rol: 'USER'
  };

  login(username: string, password: string): Observable<boolean> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${this.baseUrl}/auth/login`, { username, password }, { headers }).pipe(
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
      }),
      catchError(this.handleError<boolean>('login', false))
    );
  }

  register(nombreEmpleado: string, apellidosEmpleado: string, emailEmpleado: string, password: string): Observable<boolean> {
    const nuevoUsuario: Empleado = {
      nombreEmpleado,
      apellidosEmpleado,
      emailEmpleado,
      password,
      rol: 'USER'
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.baseUrl}/auth/register`, nuevoUsuario, { headers }).pipe(
      map(response => {
        console.log(response);
        this.router.navigate(['/']);
        return true;
      }),
      catchError(this.handleError<boolean>('register', false))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  getCurrentUser(): Empleado | null {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const parsedData = JSON.parse(userData);
      return {
        nombreEmpleado: parsedData.nombreEmpleadoRespuesta || '',
        apellidosEmpleado: '',
        emailEmpleado: '',
        password: '',
        rol: parsedData.rolRespuesta || 'USER'
      };
    }
    return null;
  }


  setCurrentUser(user: Empleado | null): void {
    this.userData = user || {
      nombreEmpleado: '',
      apellidosEmpleado: '',
      emailEmpleado: '',
      password: '',
      rol: 'USER'
    };
    this.estaLogueado = !!user;

    if (user) {
      this.esAdmin.next(user.rol);
    } else {
      this.esAdmin.next('USER');
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

  private resetUserData(): void {
    this.userData = {
      nombreEmpleado: '',
      apellidosEmpleado: '',
      emailEmpleado: '',
      password: '',
      rol: 'USER'
    };
    this.estaLogueado = false;
    this.esAdmin.next('USER');
  }
}
