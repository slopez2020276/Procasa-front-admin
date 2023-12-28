import { Component, OnInit, inject } from '@angular/core';
import { HistoriaService } from '../../services/historia.service';

@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrl: './historia.component.css'
})
export class HistoriaComponent implements OnInit {
  data 
  historiaService = inject(HistoriaService)
  async  ngOnInit()  {
    
    const response = await this.historiaService.obtenerMainPage()
    this.data = response.MainPage[0]

  }

}
