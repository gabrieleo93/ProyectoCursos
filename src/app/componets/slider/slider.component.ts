import { Component, Input, OnInit } from '@angular/core';
import { Cursos } from '../../interfaces/cursos';
import { UserService } from '../../services/user.service';
import { CursosService } from '../../services/cursos.service';
import { CursosComponent } from '../cursos/cursos.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CursosComponent, CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent implements OnInit {
  @Input() cursos: Cursos[] = [];
  slideIndex: number = 0;
  currentCourses: Cursos[] = [];

  constructor(
    private cursosServices: CursosService) { }

  ngOnInit(): void {
    this.showSlides(this.slideIndex);

    this.cursosServices.listar()
    .subscribe(curso => {
      this.cursos = curso;
      this.showSlides(this.slideIndex);
    });
  }

  plusSlides(n: number): void {
    this.slideIndex += n;
    if (this.slideIndex >= this.cursos.length) {
      this.slideIndex = 0;
    }
    if (this.slideIndex < 0) {
      this.slideIndex = this.cursos.length - 1;
    }
    this.showSlides(this.slideIndex);
  }

  showSlides(index: number): void {
    if (this.cursos.length > 0) {
      this.currentCourses = this.cursos.slice(index, index + 2);
      if (this.currentCourses.length < 2) {
        this.currentCourses = this.currentCourses.concat(this.cursos.slice(0, 2 - this.currentCourses.length));
      }
    }
  }
}
