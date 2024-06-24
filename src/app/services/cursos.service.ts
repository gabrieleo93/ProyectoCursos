import { Injectable } from '@angular/core';
import { CursosAsoc } from '../interfaces/cursosAsoc';
import { Observable, catchError, filter, map, of } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../interfaces/enviroment';
import { Cursos } from '../interfaces/cursos';


@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private readonly baseUrl: string = environment.baseUrl;
  private cursos2: Cursos[] = [];
  constructor(private router: Router, private http: HttpClient) {

  }



  // private ListadoCurso: CursosAsoc[] = [
  //   // Cursos predefinidos aquí
  //   {
  //     id:'A1',
  //     nombreCurso: 'Curso de Angular Básico',
  //     proveedor: 'Platzi',
  //     urlCurso: 'https://platzi.com/cursos/angular-basico',
  //     inicio: new Date('2023-01-01'),
  //     fin: new Date('2023-01-31'),
  //     tipoCurso: 'Desarrollo Web',
  //     calificacion: 5,
  //     titulo: null,

  //   },
  //   {
  //     id:'A2',
  //     nombreCurso: 'Introducción a Machine Learning',
  //     proveedor: 'Coursera',
  //     urlCurso: 'https://coursera.org/learn/machine-learning',
  //     inicio: new Date('2023-02-01'),
  //     fin: new Date('2023-03-01'),
  //     tipoCurso: 'Inteligencia Artificial',
  //     calificacion: 4,
  //     titulo: null,

  //   },
  //   {
  //     id:'A3',
  //     nombreCurso: 'Curso de React Avanzado',
  //     proveedor: 'Udemy',
  //     urlCurso: 'https://udemy.com/course/react-avanzado',
  //     inicio: new Date('2023-03-01'),
  //     fin: new Date('2023-03-31'),
  //     tipoCurso: 'Desarrollo Web',
  //     calificacion: 3,
  //     titulo: null,

  //   },
  //   {
  //     id:'B1',
  //     nombreCurso: 'Bases de Datos SQL',
  //     proveedor: 'edX',
  //     urlCurso: 'https://edx.org/course/sql-databases',
  //     inicio: new Date('2023-04-01'),
  //     fin: new Date('2023-04-30'),
  //     tipoCurso: 'Base de Datos',
  //     calificacion: 5,
  //     titulo: null,

  //   },
  //   {
  //     id:'B2',
  //     nombreCurso: 'Desarrollo de Apps con Flutter',
  //     proveedor: 'Udacity',
  //     urlCurso: 'https://udacity.com/course/flutter-development',
  //     inicio: new Date('2023-05-01'),
  //     fin: new Date('2023-05-31'),
  //     tipoCurso: 'Desarrollo Móvil',
  //     calificacion: 4,
  //     titulo: null,

  //   },
  //   {
  //     id:'B3',
  //     nombreCurso: 'Introducción a la Ciberseguridad',
  //     proveedor: 'FutureLearn',
  //     urlCurso: 'https://futurelearn.com/courses/cyber-security',
  //     inicio: new Date('2023-06-01'),
  //     fin: new Date('2023-06-30'),
  //     tipoCurso: 'Ciberseguridad',
  //     calificacion: 5,
  //     titulo: null,

  //   },
  //   {
  //     id:'C1',
  //     nombreCurso: 'Curso de JavaScript Moderno',
  //     proveedor: 'freeCodeCamp',
  //     urlCurso: 'https://freecodecamp.org/learn/javascript',
  //     inicio: new Date('2023-07-01'),
  //     fin: new Date('2023-07-31'),
  //     tipoCurso: 'Programación',
  //     calificacion: 5,
  //     titulo: null,

  //   },
  //   {
  //     id:'C2',
  //     nombreCurso: 'Desarrollo de Videojuegos con Unity',
  //     proveedor: 'Coursera',
  //     urlCurso: 'https://coursera.org/learn/unity-game-development',
  //     inicio: new Date('2023-08-01'),
  //     fin: new Date('2023-08-31'),
  //     tipoCurso: 'Desarrollo de Videojuegos',
  //     calificacion: 4,
  //     titulo: null,

  //   },
  //   {
  //     id:'C3',
  //     nombreCurso: 'Diseño UX/UI para Principiantes',
  //     proveedor: 'Udemy',
  //     urlCurso: 'https://udemy.com/course/ux-ui-design',
  //     inicio: new Date('2023-09-01'),
  //     fin: new Date('2023-09-30'),
  //     tipoCurso: 'Diseño',
  //     calificacion: 3,
  //     titulo: null,

  //   },
  //   {
  //     id:'D1',
  //     nombreCurso: 'Curso de Python para Data Science',
  //     proveedor: 'DataCamp',
  //     urlCurso: 'https://datacamp.com/courses/python-data-science',
  //     inicio: new Date('2023-10-01'),
  //     fin: new Date('2023-10-31'),
  //     tipoCurso: 'Data Science',
  //     calificacion: 4,
  //     titulo: null,

  //   },
  //   {
  //     id:'D2',
  //     nombreCurso: 'Desarrollo de APIs con Node.js',
  //     proveedor: 'Udacity',
  //     urlCurso: 'https://udacity.com/course/nodejs-api-development',
  //     inicio: new Date('2023-11-01'),
  //     fin: new Date('2023-11-30'),
  //     tipoCurso: 'Backend',
  //     calificacion: 5,
  //     titulo: null,

  //   },
  //   {
  //     id:'D3',
  //     nombreCurso: 'Curso de Inteligencia Artificial',
  //     proveedor: 'Coursera',
  //     urlCurso: 'https://coursera.org/learn/artificial-intelligence',
  //     inicio: new Date('2023-12-01'),
  //     fin: new Date('2023-12-31'),
  //     tipoCurso: 'Inteligencia Artificial',
  //     calificacion: 4,
  //     titulo: null,

  //   },
  //   {
  //     id:'X1',
  //     nombreCurso: 'Fundamentos de Redes de Computadoras',
  //     proveedor: 'edX',
  //     urlCurso: 'https://edx.org/course/computer-networks',
  //     inicio: new Date('2024-01-01'),
  //     fin: new Date('2024-01-31'),
  //     tipoCurso: 'Redes',
  //     calificacion: 3,
  //     titulo: null,

  //   },
  //   {
  //     id:'F2',
  //     nombreCurso: 'Curso de Docker y Kubernetes',
  //     proveedor: 'Pluralsight',
  //     urlCurso: 'https://pluralsight.com/courses/docker-kubernetes',
  //     inicio: new Date('2024-02-01'),
  //     fin: new Date('2024-02-28'),
  //     tipoCurso: 'DevOps',
  //     calificacion: 5,
  //     titulo: null,

  //   },
  //   {
  //     id:'H3',
  //     nombreCurso: 'Desarrollo de Aplicaciones con Spring Boot',
  //     proveedor: 'Udemy',
  //     urlCurso: 'https://udemy.com/course/spring-boot-development',
  //     inicio: new Date('2024-03-01'),
  //     fin: new Date('2024-03-31'),
  //     tipoCurso: 'Backend',
  //     calificacion: 4,
  //     titulo: null,

  //   },
  //   {id:'R1',
  //     nombreCurso: 'Introducción a la Ciencia de Datos',
  //     proveedor: 'Coursera',
  //     urlCurso: 'https://coursera.org/learn/data-science',
  //     inicio: new Date('2024-04-01'),
  //     fin:new Date('2024-03-31'),
  //     tipoCurso: 'Backend',
  //     calificacion: 4,
  //     titulo: null,
  //   }
  // ]
  private getHeaders(): HttpHeaders {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      console.error('Usuario actual no encontrado en localStorage');
      return new HttpHeaders();
    }

    const userData = JSON.parse(currentUser);
    const token = userData.jwt;
    if (!token) {
      console.error('Token no encontrado en el objeto userData');
      return new HttpHeaders();
    }

    if (token.split('.').length !== 3) {
      console.error('Token JWT con formato incorrecto:', token);
      return new HttpHeaders();
    }

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  listar(): Observable<Cursos[]> {
    const headers = this.getHeaders();
    if (headers.keys().length === 0) return of([]); // Retornar un observable vacío si no hay headers

    return this.http.get<Cursos[]>(`${this.baseUrl}/api/cursos/todos`, { headers }).pipe(
      map(cursos => {
        this.cursos2 = cursos;
        return cursos;
      }),
      catchError(this.handleError<Cursos[]>('listar', []))
    );
  }

  registrarCurso(
    nombreCurso: string,
    proveedor: string,
    urlCurso: string,
    tipoCurso: string,
    clasificacionFinal?: number
  ): Observable<boolean> {
    const headers = this.getHeaders();
    if (headers.keys().length === 0) return of(false); // Retornar un observable con 'false' si no hay headers

    const nuevoCurso: Cursos = {
      nombreCurso,
      proveedor,
      urlCurso,
      tipoCurso,
      clasificacionFinal
    };

    return this.http.post<any>(`${this.baseUrl}/api/cursos/insertar`, nuevoCurso, { headers }).pipe(
      map(response => {
        console.log(response);
        this.router.navigate(['/']);
        return true;
      }),
      catchError(this.handleError<boolean>('registrarCurso', false))
    );
  }

  obtenerCursoPorId(id: number): Observable<Cursos | null> {
    const headers = this.getHeaders();
    if (headers.keys().length === 0) return of(null); // Retornar un observable con 'null' si no hay headers

    return this.http.get<Cursos>(`${this.baseUrl}/api/cursos/${id}`, { headers }).pipe(
      map(curso => curso || null),
      catchError(error => {
        console.error(`Error al obtener el curso con id ${id}`, error);
        return of(null); // Devuelve null en caso de error
      })
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  applyFilters(filters: {
    nombreCurso?: string,
    proveedor?: string,
    urlCurso?: string,
    tipoCurso?: string
  }): Cursos[] {
    return this.cursos2.filter(item => {
      return (
        (!filters.nombreCurso || item.nombreCurso.toLowerCase().includes(filters.nombreCurso.toLowerCase())) &&
        (!filters.proveedor || item.proveedor.toLowerCase().includes(filters.proveedor.toLowerCase())) &&
        (!filters.urlCurso || item.urlCurso.toLowerCase().includes(filters.urlCurso.toLowerCase())) &&
        (!filters.tipoCurso || item.tipoCurso.toLowerCase().includes(filters.tipoCurso.toLowerCase()))
      );
    });
  }

  // actualizarCurso(
  //   id: string,
  //   nombreCurso: string,
  //   proveedor: string,
  //   urlCurso: string,
  //   inicio: Date,
  //   fin: Date,
  //   tipoCurso: string,
  //   calificacion: number,
  //   titulo: File | null,

  // ): Observable<CursosAsoc | null> {
  //   const cursoIndex = this.ListadoCurso.findIndex(c => c.id === id);
  //   if (cursoIndex !== -1) {
  //     this.ListadoCurso[cursoIndex] = {
  //       id,
  //       nombreCurso,
  //       proveedor,
  //       urlCurso,
  //       inicio,
  //       fin,
  //       tipoCurso,
  //       calificacion,
  //       titulo,
  //     };
  //     return of(this.ListadoCurso[cursoIndex]);
  //   }
  //   return of(null);
  // }
  // eliminarCurso(id: string): Observable<boolean> {
  //   const cursoIndex = this.ListadoCurso.findIndex(c => c.id === id);
  //   if (cursoIndex !== -1) {
  //     this.ListadoCurso.splice(cursoIndex, 1);
  //     return of(true);
  //   }
  //   return of(false);
  // }
}









