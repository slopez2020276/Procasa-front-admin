import { Component, Inject, OnInit, inject } from '@angular/core';
import { UneteEquipoService } from '../../../services/unete-equipo.service';
import { HistoriaService } from '../../../services/historia.service';
import { SharedDataService } from '../../../shared-data.service';

@Component({
  selector: 'app-nuestro-equipo',
  templateUrl: './nuestro-equipo.component.html',
  styleUrl: './nuestro-equipo.component.css'
})
export class NuestroEquipoComponent implements OnInit {

  uneteEquipoService = inject(UneteEquipoService)
   dataUnete

   constructor(private sharedDataService: SharedDataService){ }
data
imgPrincipal
imgFondo
tipoBack
colorn
dataId:any
dataID:any
correo:any = "contrataciones@procasa.com.gt"
HistoriaService = inject(HistoriaService)


toScrollPlaza(i:any){ document.getElementsByClassName('cont-area')[i]?.scrollIntoView({behavior:"smooth"}) }

async ngOnInit() {
  const response = await this.HistoriaService.obtenerHistoria()
  this.data = response.historia
  this.imgPrincipal = this.data[0].imgPathPrincipal
  this.imgFondo = this.data[0].imgPathFondo
  this.colorn = this.data[0].colorFondo
  this.evaluarTipoBack()



  this.getDataUneteEquipo()
  this.evaluarTipoBack()

}

evaluarTipoBack(){
  if(this.data[0].backgroundTipo == true){
    this.tipoBack = true
  }else if(this.data[0].backgroundTipo == false){
    this.tipoBack = false
  }
}



enviarData(id: any): void {
  this.sharedDataService.setSharedData(id);
}

async getDataUneteEquipo(){
 const data = await this.uneteEquipoService.otenerUneteEquipo()
 this.dataUnete = data.unete
  console.log(data)
}


async ObbtenerPlazaId(id:any){
  const dataId = await this.uneteEquipoService.ObtenerPlazaid(id)
  this.dataID = dataId.plaza
  this.sharedDataService.setSharedData(this.dataID)
  
}

obtenerItemd(index:any){
  console.log(index)
}

obternerFondo(){

}
}
