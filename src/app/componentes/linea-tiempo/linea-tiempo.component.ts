import { Component, OnInit, inject } from '@angular/core';
import { LineaTiempoService } from '../../services/linea-tiempo.service';

@Component({
  selector: 'app-linea-tiempo',
  templateUrl: './linea-tiempo.component.html',
  styleUrl: './linea-tiempo.component.css'
})

export class LineaTiempoComponent implements OnInit {

  lineaService = inject(LineaTiempoService)

  async ngOnInit(){
    const response = await this.lineaService.obtenerLineaTiempo()
    this.data = response[1].linea
    console.log(this.data)
  }

  data:any

  onMouseOver(osName:string): void{
    console.log(osName)
  }

}

