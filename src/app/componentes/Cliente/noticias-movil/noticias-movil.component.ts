import { Component, OnInit, inject } from '@angular/core';
import { MisionService } from '../../../services/mision.service';
import { NoticasService } from '../../../services/noticas.service';
import { SharedDataService } from '../../../shared-data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-noticias-movil',
  templateUrl: './noticias-movil.component.html',
  styleUrl: './noticias-movil.component.css'
})
export class NoticiasMovilComponent {

  data;
  enlace: string = '';
  message: string = '';
  NoticiasService = inject(NoticasService);
  descricion: string = '';
  carrousel:HTMLElement | any
  count:any = 0




  
  cargarNoticias() { this.noticiasArray = this.data }


noticiasArray: any[] = []

constructor(private sharedDataService: SharedDataService){ }

  async ngOnInit() {

    const response = await this.NoticiasService.obtenerNoticas()
    this.data = response.noticias 
    this.cargarNoticias()
    console.log(this.data)
  }

  enviarId(id: any): void {
    this.sharedDataService.setSharedId(id);
  }



}
