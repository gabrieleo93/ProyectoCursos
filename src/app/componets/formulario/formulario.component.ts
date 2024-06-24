import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CursosService } from '../../services/cursos.service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Cursos } from '../../interfaces/cursos';

@Component({
  selector: 'app-formulario',
  standalone: true,
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  imports: [FormsModule, ReactiveFormsModule, RouterOutlet, RouterLink],
})
export class FormularioComponent implements OnInit {
  curso: Cursos | null = null;
  formulariocurso: FormGroup;
  file: File | null = null;
  cursoId: number | null = null;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private cursosService: CursosService,
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
        this.isEditMode = true;
        this.cursoId = +id;
        const navigation = this.router.getCurrentNavigation();
        if (navigation?.extras.state && navigation.extras.state['curso']) {
          this.curso = navigation.extras.state['curso'] as Cursos;
          this.fillForm(this.curso);
        } else {
          this.cursosService.obtenerCursoPorId(this.cursoId).subscribe(curso => {
            if (curso) {
              this.fillForm(curso);
            } else {
              console.error('El curso no se encontró');
              // Manejar el caso cuando el curso no se encuentra
            }
          });
        }
      }
    });
  }

  fillForm(curso: Cursos): void {
    this.formulariocurso.patchValue({
      nombre: curso.nombreCurso,
      proveedor: curso.proveedor,
      url: curso.urlCurso,
      inicio: '',
      fin: '',
      tipo: curso.tipoCurso,
      calificacion: curso.clasificacionFinal,
      titulo: null
    });
  }
  isFieldDisabled(field: string): boolean {
    const value = this.formulariocurso.get(field)?.value;
    return !!value;
  }

  onSubmit(): void {
    if (this.formulariocurso.valid) {
      const cursoData = this.formulariocurso.value;
      if (this.isEditMode && this.cursoId) {
        // Lógica para actualizar curso
      } else {
        // Lógica para registrar curso
      }
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.formulariocurso.patchValue({
        titulo: file
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
