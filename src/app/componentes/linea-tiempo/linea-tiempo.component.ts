import { Component, OnInit, inject,HostListener,Renderer2 } from '@angular/core';
import { LineaTiempoService } from '../../services/linea-tiempo.service';


@Component({
  selector: 'app-linea-tiempo',
  templateUrl: './linea-tiempo.component.html',
  styleUrl: './linea-tiempo.component.css'
})

export class LineaTiempoComponent implements OnInit {

  lineaService = inject(LineaTiempoService)
  direccion: string ='';

  constructor(private renderer: Renderer2) {
    this.obtenerTamanioVentana();
  }

  async ngOnInit(){
    const response = await this.lineaService.obtenerLineaTiempo()
    this.data = response.lineas
    console.log(this.data)
  }

  data:any

  onMouseOver(osName:string): void{
    console.log(osName)
  }

  @HostListener('window:resize', ['$event'])
  obtenerTamanioVentana() {
    const anchoVentana = window.innerWidth;

    // Define tu lógica para elegir la dirección basada en el tamaño de la pantalla
    if (anchoVentana <= 768) {
      this.direccion = 'direccion-pequena';
      console.log(this.direccion)
    } else {
      this.direccion = 'direccion-grande';
      console.log(this.direccion)

    }
  }


}

