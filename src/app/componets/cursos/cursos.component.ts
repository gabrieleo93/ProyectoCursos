import { Component, Input, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { Cursos } from '../../interfaces/cursos';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatListModule, MatDividerModule, MatIconModule ],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent implements OnInit{

  @Input()
  public curso!: Cursos

  ngOnInit(): void {
    if(!this.curso)  throw new Error('curso property is recquired.');
  }
}
