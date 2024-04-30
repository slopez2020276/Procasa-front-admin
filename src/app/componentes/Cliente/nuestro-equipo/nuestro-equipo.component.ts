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

   nombreTiendaFiltro
   constructor(private sharedDataService: SharedDataService){ }


  async ngOnInit() {
    const response = await this.HistoriaService.obtenerHistoria()
    this.data = response.historia
    this.imgPrincipal = this.data[0].imgPathPrincipal
    this.imgFondo = this.data[0].imgPathFondo
    this.colorn = this.data[0].colorFondo

    this.evaluarTipoBack()
    const data = await this.uneteEquipoService.obtenerPlazasFiltradas()
 this.dataUnete = data.plazas
  console.log(data)
  
  
    console.log(this.dataUnete)

    if(this.dataUnete.length == 0){
      this.mostrarSinplazas = false
      console.log('dentro')
    }
    console.log('fuera')
  }
data
imgPrincipal
imgFondo
tipoBack
colorn
dataId:any
dataID:any
correo:any = "contrataciones@procasa.com.gt"

mostrarSinplazas = true
HistoriaService = inject(HistoriaService)


toScrollPlaza(i:any){ document.getElementsByClassName('cont-area')[i]?.scrollIntoView({behavior:"smooth"}) }



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

 if(data.unete.length == 0){
  this.mostrarSinplazas = true
 }
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
