import { Component, OnInit, inject } from '@angular/core';
import { MisionService } from '../../../services/mision.service';
import { NoticasService } from '../../../services/noticas.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css'
})


export class NoticiasComponent implements OnInit {
  data;
  enlace: string = '';
  message: string = '';
  NoticiasService = inject(NoticasService);
  descricion: string = '';
  carrousel:HTMLElement | any;

  async ngOnInit() {
    const response = await this.NoticiasService.obtenerNoticas();
    this.data = response.noticias;
    console.log(this.data);
    this.carrousel = document.querySelector('div#carrousel-noticias');
  }


arrowRight() {  }
arrowLeft() {  }



// const carousel: HTMLElement | null = document.querySelector('.carousel');
// const buttonLeft: HTMLElement | null = document.querySelector('.left');
// const buttonRight: HTMLElement | null = document.querySelector('.right');


// if (carousel && buttonLeft && buttonRight) {
//     function moveLeft() { if (carousel) { carousel.style.left = '-100vw' } }
//     function moveRight() {
//         if (carousel) { carousel.style.left = '0vw' }
//       }
//     buttonLeft.addEventListener('click', moveLeft);
//     buttonRight.addEventListener('click', moveRight);
// } else {
//     console.error('No se encontraron todos los elementos necesarios.');
// }



}
