import { Component, OnInit, inject } from '@angular/core';
import { MisionService } from '../../services/mision.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css'
})


export class NoticiasComponent implements OnInit{
  data
  enlace :string = ''
  noticiasServices = inject(MisionService)
  descricion: string = ''

  async ngOnInit()  {
    const response = await this.noticiasServices.obtenerMsion()
    this.data = response.Mision
   

    console.log(this.data)
    console.log(this.enlace)



}

}
