// cursos.service.ts
import { Injectable } from '@angular/core';
import { Cursos } from '../interfaces/cursos';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  constructor() { }

  cursosData: Cursos = {
    nombre: '',
    proveedor: '',
    url: '',
    inicio: undefined,
    fin: undefined,
    tipo: '',
    calificacion: undefined,
    titulo: '',
    UserId:''
  }

  private ListadoCurso: Cursos[] = [
    {
      nombre: 'Angular',
      proveedor: 'Master dev',
      url: 'www.masterdev.com',
      calificacion: 5,
      tipo: 'frontend'
    },
    {
      nombre: 'Java',
      proveedor: 'Udemy',
      url: 'www.Udemy.com',
      calificacion: 4,
      tipo: 'backend'
    },
    {
      nombre: 'Mysql',
      proveedor: 'universidad de nevreja',
      url: 'www.universidaddenevreja.com',
      calificacion: 5,
      tipo: 'dataBase'
    },
    {
      nombre: 'gerencia y desarrollo',
      proveedor: 'Sapiems',
      url: 'www.sapiems.com',
      calificacion: 3,
      tipo: 'analista'
    },
    {
      nombre: 'gerencia y desarrollo',
      proveedor: 'Sapiems',
      url: 'www.sapiems.com',
      calificacion: 3,
      tipo: 'analista'
    },
    {
      nombre: 'gerencia y desarrollo',
      proveedor: 'Sapiems',
      url: 'www.sapiems.com',
      calificacion: 3,
      tipo: 'analista'
    },
    {
      nombre: 'gerencia y desarrollo',
      proveedor: 'Sapiems',
      url: 'www.sapiems.com',
      calificacion: 3,
      tipo: 'analista'
    },
    {
      nombre: 'gerencia y desarrollo',
      proveedor: 'Sapiems',
      url: 'www.sapiems.com',
      calificacion: 3,
      tipo: 'analista'
    },{
      nombre: 'gerencia y desarrollo',
      proveedor: 'Sapiems',
      url: 'www.sapiems.com',
      calificacion: 3,
      tipo: 'analista'
    },{
      nombre: 'gerencia y desarrollo',
      proveedor: 'Sapiems',
      url: 'www.sapiems.com',
      calificacion: 3,
      tipo: 'analista'
    },
    {
      nombre: 'gerencia y desarrollo',
      proveedor: 'Sapiems',
      url: 'www.sapiems.com',
      calificacion: 5,
      tipo: 'analista'
    },
    {
      nombre: 'gerencia y desarrollo',
      proveedor: 'Sapiems',
      url: 'www.sapiems.com',
      calificacion: 4,
      tipo: 'analista'
    },
    {
      nombre: 'gerencia y desarrollo',
      proveedor: 'Sapiems',
      url: 'www.sapiems.com',
      calificacion: 2,
      tipo: 'analista'
    }


  ];

  registrarCurso(nombre: string, proveedor: string, url: string, inicio: Date, fin: Date, tipo: string, calificacion: number, titulo: string, file: File | null, UserId: string ): void {
    const nuevoCurso: Cursos = {
      nombre: nombre,
      proveedor: proveedor,
      url: url,
      inicio: inicio,
      fin: fin,
      tipo: tipo,
      calificacion: calificacion,
      titulo: titulo,
      UserId: UserId
    };

    // Manejar la carga de archivos si es necesario
    if (file) {
      // Lógica para manejar la carga de archivos
    }

    this.ListadoCurso.push(nuevoCurso);
  }

   // Método que devuelve el array de cursos
   listar(): Cursos [] {
    return this.ListadoCurso;
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
