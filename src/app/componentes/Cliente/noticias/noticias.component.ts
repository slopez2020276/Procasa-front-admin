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
  carrousel:HTMLElement | any
  count:any = 0



  async ngOnInit() {
    const response = await this.NoticiasService.obtenerNoticas()
    this.data = response.noticias 
  }

arrowRight() {
  this.count -= 60
  console.log(this.count)
  this.carrousel = document.querySelector('div#carrousel-noticias')
  this.carrousel.style.left = this.count+"vw"
}

arrowLeft() {
  this.count += 60
  if(this.count >= 0){ this.count = 0;  console.log(this.count) }
  this.carrousel = document.querySelector('div#carrousel-noticias')
  this.carrousel.style.left = this.count+"vw"
}


}
