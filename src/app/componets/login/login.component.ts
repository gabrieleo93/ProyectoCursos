import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { ValidatorsService } from '../../services/validators.service';
import { EmailValidatorService } from '../../services/email-validator.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, RouterOutlet, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showingRegisterForm: boolean = false;

  @Output() usuarioLogueado: EventEmitter<void> = new EventEmitter<void>();

  formularioLogin!: FormGroup;
  formularioRegistro!: FormGroup;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private servicio: UserService,
    private validator: ValidatorsService,
    private emailValidator: EmailValidatorService
  ) {}

  ngOnInit(): void {



    this.formularioLogin = this.formBuilder.group({
      username: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      password: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(12)]]
    });

    this.formularioRegistro = this.formBuilder.group({
      nombreEmpleado: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      apellidosEmpleado: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      emailEmpleado: ["", [Validators.required, Validators.pattern(this.validator.emailPattern)], [this.emailValidator]],
      password: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(12)]]
    }, {
      validators: [this.validator.isPassOneEqualsPassTwo('password', 'confirmPassword')]
    });
  }

  isValidField(field: string): boolean | null {
    const control = this.formularioRegistro.get(field);
    if (!control) return null;
    return control.invalid && (control.dirty || control.touched);
  }

  login(): void {
    this.servicio.login(
      this.formularioLogin.get("username")?.value,
      this.formularioLogin.get("password")?.value
    ).subscribe({
      next: loginCorrecto => {
        if (loginCorrecto) {
          this.usuarioLogueado.emit();
          this.router.navigate(["/home/inicio"]);
        } else {
          alert('Login incorrecto');
        }
      },
      error: error => {
        console.error('Login error:', error);
        alert('An error occurred during login. Please try again later.');
      }
    });

    this.formularioLogin.reset();
  }

  registro(): void {
    const nombreUsuario = this.formularioRegistro.get("nombreEmpleado")?.value;
    const apellido = this.formularioRegistro.get("apellidosEmpleado")?.value;
    const email = this.formularioRegistro.get("emailEmpleado")?.value;
    const password = this.formularioRegistro.get("password")?.value;

    console.log('Iniciando registro...');

    this.servicio.register(nombreUsuario, apellido, email, password).subscribe({
      next: registroConExito => {
        console.log('entrada al netx');
        if (registroConExito) {
          // Si el registro es exitoso, llamar al método login
          console.log('Registro exitoso');
          console.log("Usuario registrado correctamente");
          // Aquí puedes redirigir al usuario a donde desees después del registro
          // Por ejemplo:
          // this.router.navigate(['/dashboard']);
        } else {
          // Si el registro no es exitoso, mostrar un mensaje de error
          console.log('Registro fallido');
          alert("Las contraseñas no coinciden o el registro falló");
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
        this.formularioRegistro.reset();
      }
    });
  }

  toggleForm(): void {
    this.showingRegisterForm = !this.showingRegisterForm;
  }
}
