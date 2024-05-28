import { Component, OnInit } from '@angular/core';
import { Cursos } from '../../interfaces/cursos';
import { CursosService } from '../../services/cursos.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-exportar-listado',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,CommonModule],
  templateUrl: './exportar-listado.component.html',
  styleUrl: './exportar-listado.component.css'
})
export class ExportarListadoComponent implements OnInit {
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
