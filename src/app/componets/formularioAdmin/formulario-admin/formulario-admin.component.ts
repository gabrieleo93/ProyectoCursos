import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '../../../services/cursos.service';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-admin',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,CommonModule],
  templateUrl: './formulario-admin.component.html',
  styleUrl: './formulario-admin.component.css'
})
export class FormularioAdminComponent implements OnInit{
  formulariocurso2: FormGroup;
  file: File | null = null;
  mostrarBoton = false

  constructor(
    private fb: FormBuilder,
    private cursosService: CursosService,
    private servicio: UserService,
    private authService: AuthService,
    private router: Router,) {

    this.formulariocurso2 = this.fb.group({
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
    this.formulariocurso2.patchValue({
      titulo: file ? file.name : ''
    });
  }

  onSubmit(): void {
    if (this.formulariocurso2.valid) {
      console.log('Formulario válido');
      const { nombre, proveedor, url, inicio, fin, tipo, calificacion, titulo } = this.formulariocurso2.value;
      const userId = this.authService.getLoggedInUserId(); // Obtener el ID del usuario logueado
      console.log(userId)
      if (userId) {
        this.cursosService.registrarCurso(nombre, proveedor, url, new Date(inicio), new Date(fin), tipo, Number(calificacion), titulo, userId);
        this.formulariocurso2.reset();
        this.file = null;
      } else {
        console.error('User not logged in');
      }
  }
}

  cancel(): void {
    this.formulariocurso2.reset();
    this.file = null;
  }
  ngOnInit(): void {


    //this.rol = this.route.snapshot.paramMap.get("rol")!

  }
}
