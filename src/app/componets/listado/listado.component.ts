import { Component, OnInit } from '@angular/core'; // Importa los decoradores Component y OnInit
import { CursosService} from '../../services/cursos.service'; // Importa el servicio CursosService y la interfaz Curso
import { Cursos } from '../../interfaces/cursos';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-listado', // Selector del componente
  templateUrl: './listado.component.html', // Ruta del archivo de plantilla HTML
  styleUrls: ['./listado.component.css'],// Ruta del archivo de estilos CSS
  standalone: true,
  imports:[ FormsModule,
    ReactiveFormsModule,CommonModule]
})
export class ListadoComponent  implements OnInit {
  items: Cursos[] = [];
  filteredItems: Cursos[] = [];
  paginatedItems: Cursos[] = [];
  filters: {
    nombre?: string,
    proveedor?: string,
    tipo?: string,
    calificacionMinima?: number,
    calificacionMaxima?: number
  } = {};

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  constructor(private cursosService: CursosService,
   private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    this.items = this.cursosService.listar();
    this.filteredItems = [...this.items];
    this.applyFilters();
  }

  getStatus(curso: Cursos): string {
    if (curso.fin) {
      return 'Completado';
    } else if (curso.inicio) {
      return 'Pendiente';
    } else {
      return 'Por empezar';
    }
  }

  applyFilters(): void {
    this.filteredItems = this.cursosService.applyFilters(this.filters);
    this.currentPage = 1; // Reset to first page after filtering
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
    this.paginatedItems = this.filteredItems.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  editItem(item: Cursos): void {
    console.log('Editar elemento:', item);
  }

  deleteItem(item: Cursos): void {
    this.items = this.items.filter(i => i !== item);
    this.applyFilters(); // Vuelve a aplicar los filtros después de eliminar un elemento
  }
}
