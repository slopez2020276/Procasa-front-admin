import { Component, inject, OnInit } from '@angular/core';
import { HistoriaService } from '../../../services/historia.service';

@Component({
  selector: 'app-quiero-comprar',
  templateUrl: './quiero-comprar.component.html',
  styleUrl: './quiero-comprar.component.css'
})
export class QuieroComprarComponent implements OnInit {

  
constructor(){ }
data
imgPrincipal
  imgFondo
   colorn
   tipoBack 
HistoriaService = inject(HistoriaService)

async onSubmit(){ }

async ngOnInit() {
  const response = await this.HistoriaService.obtenerHistoria()
  this.data = response.historia
  this.imgPrincipal = this.data[0].imgPathPrincipal
    this.imgFondo = this.data[0].imgPathFondo
    this.colorn = this.data[0].colorFondo
    this.evaluarTipoBack()
}

evaluarTipoBack(){
  if(this.data[0].backgroundTipo == true){
    this.tipoBack = true
  }else if(this.data[0].backgroundTipo == false){
    this.tipoBack = false
  }
}

}
