import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CursosService } from '../../services/cursos.service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  imports: [FormsModule, ReactiveFormsModule, RouterOutlet, RouterLink],
})
export class FormularioComponent implements OnInit {
  formulariocurso: FormGroup;
  file: File | null = null;
  cursoId: string | null = null;
  isEditMode: boolean = false; // Añadir la propiedad isEditMode

  constructor(
    private fb: FormBuilder,
    private cursosService: CursosService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router

  ) {
    this.formulariocurso = this.fb.group({
      nombre: ['', Validators.required],
      proveedor: ['', Validators.required],
      url: ['', Validators.required],
      inicio: [''],
      fin: [''],
      tipo: ['', Validators.required],
      calificacion: [''],
      titulo: ['']
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.cursoId = id;
        this.cargarCurso(this.cursoId);
      }
    });
  }

  cargarCurso(id: string): void {
    this.cursosService.obtenerCursoPorId(id).subscribe(curso => {
      if (curso) {
        this.formulariocurso.patchValue({
          nombre: curso.nombre,
          proveedor: curso.proveedor,
          url: curso.url,
          inicio: curso.inicio.toISOString().split('T')[0], // Convertir a string para el input de fecha
          fin: curso.fin.toISOString().split('T')[0],       // Convertir a string para el input de fecha
          tipo: curso.tipo,
          calificacion: curso.calificacion,
          titulo: curso.titulo
        });
        this.isEditMode = true;
      }
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.file = file;
    this.formulariocurso.patchValue({
      titulo: file ? file.name : ''
    });
  }

  onSubmit(): void {
    if (this.formulariocurso.valid) {
      const { nombre, proveedor, url, inicio, fin, tipo, calificacion, titulo } = this.formulariocurso.value;
      const userId = this.authService.getLoggedInUserId();

      if (userId) {
        if (this.isEditMode && this.cursoId) {
          this.cursosService.actualizarCurso(
            this.cursoId,
            nombre,
            proveedor,
            url,
            new Date(inicio),
            new Date(fin),
            tipo,
            Number(calificacion),
            this.file,
            userId
          ).subscribe(cursoActualizado => {
            console.log('Curso actualizado:', cursoActualizado);
            this.router.navigate(['/home/listado']);
          });
        } else {
          this.cursosService.registrarCurso(
            nombre,
            proveedor,
            url,
            new Date(inicio),
            new Date(fin),
            tipo,
            Number(calificacion),
            this.file,
            userId
          ).subscribe(nuevoCurso => {
            console.log('Curso registrado:', nuevoCurso);
            this.router.navigate(['/home/listado']);
          });
        }
      } else {
        console.error('User not logged in');
      }
    } else {
      console.error('Formulario no es válido');
    }
  }
  cancel(): void {
    this.formulariocurso.reset();
    this.file = null;
    this.router.navigate(['/home/cursos']); // Redirigir a la lista de cursos si se cancela
  }
}
