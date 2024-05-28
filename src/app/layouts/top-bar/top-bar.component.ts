import { Component } from '@angular/core';
import { LoginComponent } from '../../componets/login/login.component';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'top-bar',
  standalone: true,
  imports: [LoginComponent, RouterOutlet],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {
  
}


