import { Component, OnInit, inject } from '@angular/core';
import { LineaTiempoService } from '../../services/linea-tiempo.service';

@Component({
  selector: 'app-linea-tiempo',
  templateUrl: './linea-tiempo.component.html',
  styleUrl: './linea-tiempo.component.css'
})
export class LineaTiempoComponent implements OnInit {
  dataNoticias

  LineaService = inject(LineaTiempoService)

 async ngOnInit() {
    const response = await this.LineaService.ObtenerLineaTiempo()
    this.dataNoticias = response
  }

}
