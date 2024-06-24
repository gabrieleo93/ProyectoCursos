import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CursosService } from '../../../services/cursos.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-admin',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,CommonModule],
  templateUrl: './formulario-admin.component.html',
  styleUrl: './formulario-admin.component.css'
})
export class FormularioAdminComponent implements OnInit{
  formulariocurso2!: FormGroup;
  file: File | null = null;
  mostrarBoton = false

  constructor(
    private fb: FormBuilder,
    private cursosService: CursosService,
  private router: Router) {


  }
  ngOnInit(): void {


    this.formulariocurso2 = this.fb.group({
      nombre: ['', Validators.required],
      proveedor: ['', Validators.required],
      url: ['', Validators.required],
      tipo: ['', Validators.required],
      clasificacionFinal: [''],

    });

  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.file = file;
    this.formulariocurso2.patchValue({
      titulo: file ? file.name : ''
    });
  }

  registro(): void {
    const nombreCurso = this.formulariocurso2.get("nombre")?.value;
    const proveedor = this.formulariocurso2.get("proveedor")?.value;
    const url = this.formulariocurso2.get("url")?.value;
    const tipo = this.formulariocurso2.get("tipo")?.value;
    const clasificacionFinal= 0;



    console.log('Iniciando registro...');

    this.cursosService.registrarCurso( nombreCurso, proveedor, url, tipo, clasificacionFinal).subscribe({
      next: registroConExito => {
        console.log('entrada al next');
        if (registroConExito) {
          // Si el registro es exitoso, llamar al método login
          console.log('Registro exitoso');
          // Aquí puedes redirigir al usuario a donde desees después del registro
          // Por ejemplo:
          this.router.navigate(['/home/listado']);
        } else {
          // Si el registro no es exitoso, mostrar un mensaje de error
          console.log('Registro fallido');
        }
      },
      error: error => {
        // Manejar errores de la petición
        console.error('Error en el registro:', error);
        alert('An error occurred during registration. Please try again later.');
      },
      complete: () => {
        // Aquí puedes realizar alguna acción adicional después de que la solicitud haya sido completada
        // Por ejemplo, restablecer el formulario
        this.formulariocurso2.reset();
      }
    });
  }

  cancel(): void {
    this.formulariocurso2.reset();
    this.file = null;
  }

}
