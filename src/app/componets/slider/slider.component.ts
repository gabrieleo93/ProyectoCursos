import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent implements OnInit {
  slideIndex: number = 1;

  constructor() { }

  ngOnInit(): void {
    this.showSlides(this.slideIndex);
  }

  plusSlides(n: number): void {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n: number): void {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n: number): void {
    let i: number;
    const slides: HTMLCollectionOf<HTMLImageElement> = document.getElementsByClassName("slider")[0].getElementsByTagName("img") as HTMLCollectionOf<HTMLImageElement>;

    if (n > slides.length) { this.slideIndex = 1; }    
    if (n < 1) { this.slideIndex = slides.length; }
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    
    slides[this.slideIndex - 1].style.display = "block";  
  }
}
