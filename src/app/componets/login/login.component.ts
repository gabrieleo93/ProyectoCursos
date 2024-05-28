import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterOutlet, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  showingRegisterForm: boolean= false;

@Output()usuarioLogueado: EventEmitter<void> = new EventEmitter<void>();

constructor(
  private router: Router,
  private formBuldier: FormBuilder,
  private servicio: UserService,
  private auth: AuthService


){}

formularioLogin: FormGroup= new FormGroup({
  mail: new FormControl(""),
  password: new FormControl("")

})
formularioRegistro: FormGroup= new FormGroup({
  nombre: new FormControl(""),
  apellido: new FormControl(""),
  mail: new FormControl(""),
  password: new FormControl(""),
  confirmPassword: new FormControl(""),
  tipo: new FormControl(""),

})
ngOnInit(): void {
  this.formularioLogin = this.formBuldier.group({
    mail:["",[Validators.required, Validators.minLength(3),Validators.maxLength(100)]],
    password: ["",[Validators.required, Validators.minLength(3), Validators.maxLength(12)]],

  })
  this.formularioRegistro = this.formBuldier.group({
    nombre:["",[Validators.required, Validators.minLength(3),Validators.maxLength(10)]],
    apellido:["",[Validators.required, Validators.minLength(3),Validators.maxLength(10)]],
    mail:["",[Validators.required, Validators.email]],
    password: ["",[Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
    confirmPassword: ["",[Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
    tipo:["",[Validators.required]]

  })
}


login(){
let loginCorrecto= this.servicio.login(
  this.formularioLogin.get("mail")?.value,
  this.formularioLogin.get("password")?.value
)


if(loginCorrecto){
  this.usuarioLogueado.emit();
  this.router.navigate(["/home/inicio"])
}
this.formularioLogin.get("mail")?.setValue("");
this.formularioLogin.get("password")?.setValue("");

};

registro(){
  const nombreUsuario=this.formularioRegistro.get("nombre")?.value
  const apellido=this.formularioRegistro.get("apellido")?.value
  const mail=this.formularioRegistro.get("mail")?.value
  const password=this.formularioRegistro.get("password")?.value
  const confirmPassword=this.formularioRegistro.get("confirmPassword")?.value
  const tipo=this.formularioRegistro.get("tipo")?.value


  const registroConExito = this.servicio.registrer(nombreUsuario,apellido, mail, password, confirmPassword,  tipo )

  if(!registroConExito){
      alert("Las contraseñas no coinciden")
    }else{
      this.formularioLogin.get("nombre")?.setValue(nombreUsuario)
      this.formularioLogin.get("apellido")?.setValue(apellido)
      this.formularioLogin.get("mail")?.setValue(mail)
      this.formularioLogin.get("password")?.setValue(password)
      this.formularioLogin.get("tipo")?.setValue(tipo)



      this.login();
      console.log("se ha registrado el usuario correctamente");
    }
    this.formularioRegistro.get("nombre")?.setValue("");
    this.formularioRegistro.get("apellido")?.setValue("");
    this.formularioRegistro.get("mail")?.setValue("");
    this.formularioRegistro.get("password")?.setValue("");
    this.formularioRegistro.get("confirmPassword")?.setValue("");
    this.formularioRegistro.get("tipo")?.setValue("");

}

toggleForm(){
  this.showingRegisterForm=!this.showingRegisterForm
}

}
