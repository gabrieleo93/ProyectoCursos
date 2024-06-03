import { Injectable } from '@angular/core';
import { Cursos } from '../interfaces/cursos';
import { Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  
  constructor() { }

  private ListadoCurso: Cursos[] = [
    // Cursos predefinidos aquí
    {
      id:'A1',
      nombre: 'Curso de Angular Básico',
      proveedor: 'Platzi',
      url: 'https://platzi.com/cursos/angular-basico',
      inicio: new Date('2023-01-01'),
      fin: new Date('2023-01-31'),
      tipo: 'Desarrollo Web',
      calificacion: 5,
      titulo: null,
      UserId: 'user1'
    },
    {
      id:'A2',
      nombre: 'Introducción a Machine Learning',
      proveedor: 'Coursera',
      url: 'https://coursera.org/learn/machine-learning',
      inicio: new Date('2023-02-01'),
      fin: new Date('2023-03-01'),
      tipo: 'Inteligencia Artificial',
      calificacion: 4,
      titulo: null,
      UserId: 'user2'
    },
    {
      id:'A3',
      nombre: 'Curso de React Avanzado',
      proveedor: 'Udemy',
      url: 'https://udemy.com/course/react-avanzado',
      inicio: new Date('2023-03-01'),
      fin: new Date('2023-03-31'),
      tipo: 'Desarrollo Web',
      calificacion: 3,
      titulo: null,
      UserId: 'user3'
    },
    {
      id:'B1',
      nombre: 'Bases de Datos SQL',
      proveedor: 'edX',
      url: 'https://edx.org/course/sql-databases',
      inicio: new Date('2023-04-01'),
      fin: new Date('2023-04-30'),
      tipo: 'Base de Datos',
      calificacion: 5,
      titulo: null,
      UserId: 'user4'
    },
    {
      id:'B2',
      nombre: 'Desarrollo de Apps con Flutter',
      proveedor: 'Udacity',
      url: 'https://udacity.com/course/flutter-development',
      inicio: new Date('2023-05-01'),
      fin: new Date('2023-05-31'),
      tipo: 'Desarrollo Móvil',
      calificacion: 4,
      titulo: null,
      UserId: 'user5'
    },
    {
      id:'B3',
      nombre: 'Introducción a la Ciberseguridad',
      proveedor: 'FutureLearn',
      url: 'https://futurelearn.com/courses/cyber-security',
      inicio: new Date('2023-06-01'),
      fin: new Date('2023-06-30'),
      tipo: 'Ciberseguridad',
      calificacion: 5,
      titulo: null,
      UserId: 'user6'
    },
    {
      id:'C1',
      nombre: 'Curso de JavaScript Moderno',
      proveedor: 'freeCodeCamp',
      url: 'https://freecodecamp.org/learn/javascript',
      inicio: new Date('2023-07-01'),
      fin: new Date('2023-07-31'),
      tipo: 'Programación',
      calificacion: 5,
      titulo: null,
      UserId: 'user7'
    },
    {
      id:'C2',
      nombre: 'Desarrollo de Videojuegos con Unity',
      proveedor: 'Coursera',
      url: 'https://coursera.org/learn/unity-game-development',
      inicio: new Date('2023-08-01'),
      fin: new Date('2023-08-31'),
      tipo: 'Desarrollo de Videojuegos',
      calificacion: 4,
      titulo: null,
      UserId: 'user8'
    },
    {
      id:'C3',
      nombre: 'Diseño UX/UI para Principiantes',
      proveedor: 'Udemy',
      url: 'https://udemy.com/course/ux-ui-design',
      inicio: new Date('2023-09-01'),
      fin: new Date('2023-09-30'),
      tipo: 'Diseño',
      calificacion: 3,
      titulo: null,
      UserId: 'user9'
    },
    {
      id:'D1',
      nombre: 'Curso de Python para Data Science',
      proveedor: 'DataCamp',
      url: 'https://datacamp.com/courses/python-data-science',
      inicio: new Date('2023-10-01'),
      fin: new Date('2023-10-31'),
      tipo: 'Data Science',
      calificacion: 4,
      titulo: null,
      UserId: 'user10'
    },
    {
      id:'D2',
      nombre: 'Desarrollo de APIs con Node.js',
      proveedor: 'Udacity',
      url: 'https://udacity.com/course/nodejs-api-development',
      inicio: new Date('2023-11-01'),
      fin: new Date('2023-11-30'),
      tipo: 'Backend',
      calificacion: 5,
      titulo: null,
      UserId: 'user11'
    },
    {
      id:'D3',
      nombre: 'Curso de Inteligencia Artificial',
      proveedor: 'Coursera',
      url: 'https://coursera.org/learn/artificial-intelligence',
      inicio: new Date('2023-12-01'),
      fin: new Date('2023-12-31'),
      tipo: 'Inteligencia Artificial',
      calificacion: 4,
      titulo: null,
      UserId: 'user12'
    },
    {
      id:'X1',
      nombre: 'Fundamentos de Redes de Computadoras',
      proveedor: 'edX',
      url: 'https://edx.org/course/computer-networks',
      inicio: new Date('2024-01-01'),
      fin: new Date('2024-01-31'),
      tipo: 'Redes',
      calificacion: 3,
      titulo: null,
      UserId: 'user13'
    },
    {
      id:'F2',
      nombre: 'Curso de Docker y Kubernetes',
      proveedor: 'Pluralsight',
      url: 'https://pluralsight.com/courses/docker-kubernetes',
      inicio: new Date('2024-02-01'),
      fin: new Date('2024-02-28'),
      tipo: 'DevOps',
      calificacion: 5,
      titulo: null,
      UserId: 'user14'
    },
    {
      id:'H3',
      nombre: 'Desarrollo de Aplicaciones con Spring Boot',
      proveedor: 'Udemy',
      url: 'https://udemy.com/course/spring-boot-development',
      inicio: new Date('2024-03-01'),
      fin: new Date('2024-03-31'),
      tipo: 'Backend',
      calificacion: 4,
      titulo: null,
      UserId: 'user15'
    },
    {id:'R1',
      nombre: 'Introducción a la Ciencia de Datos',
      proveedor: 'Coursera',
      url: 'https://coursera.org/learn/data-science',
      inicio: new Date('2024-04-01'),
      fin: new Date('2024-04-30'),
      tipo: 'Data Science',
      calificacion: 5,
      titulo: null,
      UserId: 'user16'
    },
    {id:'R2',
      nombre: 'Curso de Big Data con Hadoop',
      proveedor: 'edX',
      url: 'https://edx.org/course/big-data-hadoop',
      inicio: new Date('2024-05-01'),
      fin: new Date('2024-05-31'),
      tipo: 'Big Data',
      calificacion: 3,
      titulo: null,
      UserId: 'user17'
    },
    {id:'T3',
      nombre: 'Desarrollo de Apps con Swift',
      proveedor: 'Udacity',
      url: 'https://udacity.com/course/swift-app-development',
      inicio: new Date('2024-06-01'),
      fin: new Date('2024-06-30'),
      tipo: 'Desarrollo Móvil',
      calificacion: 5,
      titulo: null,
      UserId: 'user18'
    },
    {id:'P1',
      nombre: 'Fundamentos de Machine Learning con Python',
      proveedor: 'Coursera',
      url: 'https://coursera.org/learn/machine-learning-python',
      inicio: new Date('2024-07-01'),
      fin: new Date('2024-07-31'),
      tipo: 'Inteligencia Artificial',
      calificacion: 4,
      titulo: null,
      UserId: 'user19'
    },
    {id:'T2',
      nombre: 'Curso de Diseño Gráfico con Photoshop',
      proveedor: 'Udemy',
      url: 'https://udemy.com/course/photoshop-graphic-design',
      inicio: new Date('2024-08-01'),
      fin: new Date('2024-08-31'),
      tipo: 'Diseño',
      calificacion: 3,
      titulo: null,
      UserId: 'user20'
    }
  ];

  registrarCurso(
    nombre: string,
    proveedor: string,
    url: string,
    inicio: Date,
    fin: Date,
    tipo: string,
    calificacion: number,
    titulo: File | null,
    UserId: string
  ): Observable<Cursos> {
    const nuevoCurso: Cursos = {
      id: uuid(),
      nombre,
      proveedor,
      url,
      inicio,
      fin,
      tipo,
      calificacion,
      titulo,
      UserId
    };
    // Manejar la carga de archivos si es necesario
    if (titulo) {
      // Lógica para manejar la carga de archivos
    }
    this.ListadoCurso.push(nuevoCurso);
    return of(nuevoCurso);
  }




  // Método que devuelve el array de cursos
  listar(): Observable<Cursos[]> {
    return of(this.ListadoCurso);
  }
  obtenerCursoPorId(id: string): Observable<any> {
    const curso = this.ListadoCurso.find(c => c.id === id);
    return of(curso);
  }

  actualizarCurso(
    id: string,
    nombre: string,
    proveedor: string,
    url: string,
    inicio: Date,
    fin: Date,
    tipo: string,
    calificacion: number,
    titulo: File | null,
    UserId: string
  ): Observable<Cursos | null> {
    const cursoIndex = this.ListadoCurso.findIndex(c => c.id === id);
    if (cursoIndex !== -1) {
      this.ListadoCurso[cursoIndex] = {
        id,
        nombre,
        proveedor,
        url,
        inicio,
        fin,
        tipo,
        calificacion,
        titulo,
        UserId
      };
      return of(this.ListadoCurso[cursoIndex]);
    }
    return of(null);
  }
  eliminarCurso(id: string): Observable<boolean> {
    const cursoIndex = this.ListadoCurso.findIndex(c => c.id === id);
    if (cursoIndex !== -1) {
      this.ListadoCurso.splice(cursoIndex, 1);
      return of(true);
    }
    return of(false);
  }



  applyFilters(filters: {
    nombre?: string,
    proveedor?: string,
    tipo?: string,
    calificacionMinima?: number,
    calificacionMaxima?: number
  }): Cursos[] {
    return this.ListadoCurso.filter(item => {
      return (
        (!filters.nombre || item.nombre.toLowerCase().includes(filters.nombre.toLowerCase())) &&
        (!filters.proveedor || item.proveedor.toLowerCase().includes(filters.proveedor.toLowerCase())) &&
        (!filters.tipo || item.tipo.toLowerCase().includes(filters.tipo.toLowerCase())) &&
        (!filters.calificacionMinima || (item.calificacion ?? 0) >= filters.calificacionMinima) &&
        (!filters.calificacionMaxima || (item.calificacion ?? 0) <= filters.calificacionMaxima)
      );
    });
  }
}
