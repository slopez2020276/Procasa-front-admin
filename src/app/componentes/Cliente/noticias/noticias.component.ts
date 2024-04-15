import { Component, OnInit, inject } from '@angular/core';
import { MisionService } from '../../../services/mision.service';
import { NoticasService } from '../../../services/noticas.service';
import { SharedDataService } from '../../../shared-data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';


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




noticiasArray: any[] = []

cargarNoticias() { this.noticiasArray = this.data }

ShiftArray(){}
PushArray(){}
















constructor(private sharedDataService: SharedDataService){

  
}

shiftArray() {
const firstElement = this.noticiasArray.shift()
this.noticiasArray.push(firstElement)
}








  async ngOnInit() {
    
    
    const response = await this.NoticiasService.obtenerNoticas()
    this.data = response.noticias 
    this.cargarNoticias()
    console.log(this.data)
  }

  enviarId(id: any): void {
    this.sharedDataService.setSharedId(id);
  }

arrowRight() {
  this.count -= 40
  console.log(this.count)
  this.carrousel = document.querySelector('div#carrousel-noticias')
  this.carrousel.style.left = this.count+"vw"
}

arrowLeft() {
  this.count += 40
  if(this.count >= 0){ this.count = 0;  console.log(this.count) }
  this.carrousel = document.querySelector('div#carrousel-noticias')
  this.carrousel.style.left = this.count+"vw"
}


  customOptions: OwlOptions = {
   loop: true,
    autoplay: true,
    center: true,
    dots: false,
    autoHeight: true,
    autoWidth: true,
  };



}
