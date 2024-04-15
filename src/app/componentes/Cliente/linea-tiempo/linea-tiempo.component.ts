import { Component, OnInit, inject,HostListener,Renderer2 } from '@angular/core';
import { LineaTiempoService } from '../../../services/linea-tiempo.service';
import { LogoControl } from '@maptiler/sdk';


@Component({
  selector: 'app-linea-tiempo',
  templateUrl: './linea-tiempo.component.html',
  styleUrl: './linea-tiempo.component.css'
})

export class LineaTiempoComponent implements OnInit {
  data:any

  lineaService = inject(LineaTiempoService)
  direccion: string ='';


  
  constructor(private renderer: Renderer2) {
    
  }
  
  async ngOnInit(){
    const response = await this.lineaService.obtenerLineaTiempo()
    this.data = response.registros
    console.log(this.data)
  }
  


  onMouseOver(osName:string): void{
    console.log(osName)
  }

 


}

