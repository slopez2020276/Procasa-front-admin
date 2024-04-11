import { Component, Inject, OnInit, inject } from '@angular/core';
import { HistoriaService } from '../../../services/historia.service';

@Component({
  selector: 'app-equipo-unico',
  templateUrl: './equipo-unico.component.html',
  styleUrl: './equipo-unico.component.css'
})
export class EquipoUnicoComponent implements OnInit {
  data
  imgPrincipal
  imgFondo
  tipoBack
  colorn  
  HistoriaService = inject(HistoriaService)

async ngOnInit() {
  const response = await this.HistoriaService.obtenerHistoria()
  this.data = response.historia
  this.imgPrincipal = this.data[0].imgPathPrincipal
  this.imgFondo = this.data[0].imgPathFondo
  this.colorn = this.data[0].colorFondo
  this.evaluarTipoBack()

}

backPage(): void { window.history.back() }

evaluarTipoBack(){
  if(this.data[0].backgroundTipo == true){
    this.tipoBack = true
  }else if(this.data[0].backgroundTipo == false){
    this.tipoBack = false
  }
}

}
