import { Component, OnInit, inject } from '@angular/core';
import { MisionService } from '../../../services/mision.service';
import { NoticasService } from '../../../services/noticas.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css'
})


export class NoticiasComponent implements OnInit{
  data
  enlace :string = ''
  message:string = ''
  NoticiasService = inject(NoticasService)
  descricion: string = ''

  async ngOnInit()  {
    const response = await this.NoticiasService.obtenerNoticas()
    this.data = response.noticias
    console.log(this.data)
}

}
