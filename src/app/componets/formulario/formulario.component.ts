// formulario.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CursosService } from '../../services/cursos.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
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
  mostrarBoton = false

  constructor(
    private fb: FormBuilder,
    private cursosService: CursosService,
    private servicio: UserService,
    private authService: AuthService,
    private router: Router,) {

    this.formulariocurso = this.fb.group({
      nombre: ['', Validators.required],
      proveedor: ['', Validators.required],
      url: ['', Validators.required],
      inicio: [''],
      fin: [''],
      tipo: ['', Validators.required],
      calificacion: ['', Validators.required],
      titulo: ['']
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
      console.log('Formulario válido');
      const { nombre, proveedor, url, inicio, fin, tipo, calificacion, titulo } = this.formulariocurso.value;
      const userId = this.authService.getLoggedInUserId(); // Obtener el ID del usuario logueado
      console.log(userId)
      if (userId) {
        this.cursosService.registrarCurso(nombre, proveedor, url, new Date(inicio), new Date(fin), tipo, Number(calificacion), titulo, this.file, userId);
        this.formulariocurso.reset();
        this.file = null;
      } else {
        console.error('User not logged in');
      }
  }
}

  cancel(): void {
    this.formulariocurso.reset();
    this.file = null;
  }
  ngOnInit(): void {


    //this.rol = this.route.snapshot.paramMap.get("rol")!

  }
}
