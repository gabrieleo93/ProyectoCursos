import { Component, OnInit } from '@angular/core';
import { CursosService } from '../../services/cursos.service';
import { CursosAsoc } from '../../interfaces/cursosAsoc';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Cursos } from '../../interfaces/cursos';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule]
})
export class ListadoComponent implements OnInit {
  items: Cursos[] = [];
  filteredItems: Cursos[] = [];
  paginatedItems: Cursos[] = [];
  filters: {
    nombreCurso?: string,
    proveedor?: string,
    urlCurso?: string,
    tipoCurso?: string,
    calificacionMinima?: number,
    calificacionMaxima?: number
  } = {};

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  constructor(private cursosService: CursosService, private route: Router) { }

  ngOnInit(): void {
    this.cursosService.listar().subscribe({
      next: (cursos) => {
        this.items = cursos;
        this.filteredItems = [...this.items];
        this.applyFilters();
      },
      error: (err) => console.error('Error al listar los cursos', err)
    });
  }

  applyFilters(): void {
    this.filteredItems = this.cursosService.applyFilters(this.filters);
    this.currentPage = 1;
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

  editItem(id: number): void {
    const selectedCurso = this.items.find(item => item.idCurso === id);
    if (selectedCurso) {
      // Navega a la ruta del formulario con el ID del curso como parámetro y el estado del curso
      this.route.navigate(['/home/formulario', id], { state: { curso: selectedCurso } });
    }
  }

  getStatus(curso: CursosAsoc): string {
    if (curso.fin) {
      return 'Completado';
    } else if (curso.inicio) {
      return 'Pendiente';
    } else {
      return 'Por empezar';
    }
  }
}
