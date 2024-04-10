import { Component, OnInit, inject } from '@angular/core';
import { HistoriaService } from '../../../services/historia.service';
import { NoticasService } from '../../../services/noticas.service';
import { SharedDataService } from '../../../shared-data.service';

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
  NoticiaSevices = inject(NoticasService)
  sharedId;
  title
  descripcion
  imgPhat

constructor(private sharedDataService: SharedDataService){
  this.sharedId = this.sharedDataService.getSharedId();
}

backPage(): void { window.history.back() }

  async ngOnInit() {
    const response = await this.HistoriaService.obtenerHistoria()
    this.data = response.historia
    this.imgPrincipal = this.data[0].imgPathPrincipal
    this.imgFondo = this.data[0].imgPathFondo
    this.colorn = this.data[0].colorFondo
    this.evaluarTipoBack()
    
    this.sharedId = this.sharedDataService.getSharedId();
    console.log(this.sharedId)
    console.log(this.data)
    console.log(this.colorn)
    this.obtenerNoticia(this.sharedId)
  }


evaluarTipoBack(){
 if(this.data[0].backgroundTipo == true){
   this.tipoBack = true
 }else if(this.data[0].backgroundTipo == false){
   this.tipoBack = false
 }
}


async obtenerNoticia(id:any){
  const respuesta = await this.NoticiaSevices.obtenerxID(this.sharedId)
  console.log(respuesta.noticia.title)

  this.title = respuesta.noticia.title
  this.descripcion = respuesta.noticia.descripcion
  this.imgPhat = respuesta.noticia.imgPhat
}

}
