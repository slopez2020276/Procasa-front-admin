import { Component, OnInit, inject } from '@angular/core';
import { HistoriaService } from '../../services/historia.service';

@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrl: './historia.component.css'
})
export class HistoriaComponent implements OnInit {
  data
  enlace :string = ''
  historiaService = inject(HistoriaService)
  descricion: string = ''

    async ngOnInit()  {
       const response = await this.historiaService.obtenerHistoria()
       this.data = response.historia[0]
      this.enlace = this.data.EncalceVideo
      this.descricion = response.historia[0].DescripcionHistoria

       console.log(this.data)
       console.log(this.enlace)



  }





}
