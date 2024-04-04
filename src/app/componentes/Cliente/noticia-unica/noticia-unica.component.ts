import { Component, OnInit, inject } from '@angular/core';
import { HistoriaService } from '../../../services/historia.service';

@Component({
  selector: 'app-noticia-unica',
  templateUrl: './noticia-unica.component.html',
  styleUrl: './noticia-unica.component.css'
})
export class NoticiaUnicaComponent implements OnInit {
  data
  imgPrincipal
  imgFondo
  colorn
  tipoBack 
  HistoriaService = inject(HistoriaService)



  async ngOnInit() {
    const response = await this.HistoriaService.obtenerHistoria()
    this.data = response.historia
    this.imgPrincipal = this.data[0].imgPathPrincipal
    this.imgFondo = this.data[0].imgPathFondo
    this.colorn = this.data[0].colorFondo
    this.evaluarTipoBack()
    console.log(this.data)
    console.log(this.colorn)
  }


evaluarTipoBack(){
 if(this.data[0].backgroundTipo == true){
   this.tipoBack = true
 }else if(this.data[0].backgroundTipo == false){
   this.tipoBack = false
 }
}


}
