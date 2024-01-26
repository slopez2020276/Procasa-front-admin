import { Component, OnInit, inject } from '@angular/core';
import { MisionService } from '../../services/mision.service';
import { NoticasService } from '../../services/noticas.service';

@Component({
  selector: 'app-noticias0.1',
  templateUrl: './noticias0.1.component.html',
  styleUrl: './noticias0.1.component.css'
})
export class Noticias01Component  implements OnInit{

  data
  enlace :string = ''
  NoticiasService = inject(NoticasService)
  descricion: string = ''

  async ngOnInit()  {
    const response = await this.NoticiasService.obtenerNoticas()
    this.data = response.noticas
   

    console.log(this.data)
   



  }
}
