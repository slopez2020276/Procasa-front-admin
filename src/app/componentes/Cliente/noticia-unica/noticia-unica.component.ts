import { Component, OnInit, inject } from '@angular/core';
import { HistoriaService } from '../../../services/historia.service';
import { NoticasService } from '../../../services/noticas.service';
import { SharedDataService } from '../../../shared-data.service';
import { ActivatedRoute } from '@angular/router';
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

  idNotica:any
constructor( private route: ActivatedRoute){
  this.route.params.subscribe(params => this.idNotica = params['id']);
}

backPage(): void { window.history.back() }

  async ngOnInit() {
    const response = await this.HistoriaService.obtenerHistoria()
    this.data = response.historia
    this.imgPrincipal = this.data[0].imgPathPrincipal
    this.imgFondo = this.data[0].imgPathFondo
    this.colorn = this.data[0].colorFondo
    this.evaluarTipoBack()


  const respuesta = await this.NoticiaSevices.obtenerxID(this.idNotica)
  console.log(respuesta.noticia)

  this.title = respuesta.noticia.title
  this.descripcion = respuesta.noticia.descripcion
  this.imgPhat = respuesta.noticia.imgPhat
    
    
  }


evaluarTipoBack(){
 if(this.data[0].backgroundTipo == true){
   this.tipoBack = true
 }else if(this.data[0].backgroundTipo == false){
   this.tipoBack = false
 }
}


async obtenerNoticia(){

  
  const respuesta = await this.NoticiaSevices.obtenerxID(this.idNotica)
  console.log(respuesta)

  this.title = respuesta[0].title
  this.descripcion = respuesta.descripcion
  this.imgPhat = respuesta.imgPhat
}

}
