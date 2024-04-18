import { Component, Inject, OnInit, inject } from '@angular/core';
import { HistoriaService } from '../../../services/historia.service';
import { UneteEquipoService } from '../../../services/unete-equipo.service';
import { SharedDataService } from '../../../shared-data.service';
import { ActivatedRoute } from '@angular/router';

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
  UneteService = inject(UneteEquipoService)
  sharedData
  idPlaza
  dataId



  description
  NombrePlaza
  imgPlaza



  constructor(private sharedDataService: SharedDataService, private route: ActivatedRoute){
    this.sharedData = this.sharedDataService.getSharedData();
    this.route.params.subscribe(params => this.idPlaza = params['id']);

  }




async ngOnInit() {
  const response = await this.HistoriaService.obtenerHistoria()
  this.data = response.historia
  this.imgPrincipal = this.data[0].imgPathPrincipal
  this.imgFondo = this.data[0].imgPathFondo
  this.colorn = this.data[0].colorFondo
  this.evaluarTipoBack()
  this.sharedData = this.sharedDataService.getSharedData();
  console.log(this.sharedData)
  this.obtenerPlaza()
}

backPage(): void { window.history.back() }

evaluarTipoBack(){
  if(this.data[0].backgroundTipo == true){
    this.tipoBack = true
  }else if(this.data[0].backgroundTipo == false){
    this.tipoBack = false
  }
}



async obtenerPlaza(){
  const respuesta = await this.UneteService.ObtenerPlazaid(this.idPlaza)
  console.log(respuesta)
  this.dataId = respuesta.plaza
  this.NombrePlaza = respuesta.plaza.titulo
  this.description = respuesta.plaza.descripcion
  this.imgPlaza = respuesta.plaza.imgPath
}


}
