import { Component, OnInit, inject } from '@angular/core';
import { UbicacionServiceService } from '../../../services/ubicacion-service.service';
import { HistoriaService } from '../../../services/historia.service';
import { MostrarimgsUbicacionPipe } from '../../../pipes/mostrarimgs-ubicacion.pipe'
import { MostrarPorUbiPipe } from '../../../pipes/mostrar-por-ubi.pipe'
import { UneteEquipoService } from '../../../services/unete-equipo.service';

@Component({
  selector: 'app-ubicaciones',
  templateUrl: './ubicaciones.component.html',
  styleUrl: './ubicaciones.component.css'
})
export class UbicacionesComponent {

  UbicacionService = inject(UbicacionServiceService)

  constructor(){  }
  data
  imgPrincipal
  imgFondo
  HistoriaService = inject(HistoriaService)
  UbicacionesService = inject(UbicacionServiceService)
  dataUbicaciones
  filtro
  filtroIMG
  colorn
  tipoBack
  mostrarlista = true

  async onSubmit(){ }

 async ngOnInit() {

  this.checkLogo(0)

   document.getElementById('cont-slide')?.classList.add('a')
   const response = await this.HistoriaService.obtenerHistoria()
   document.getElementsByClassName('title-sucs')[0]?.classList.add('select')


    this.data = response.historia
    this.imgPrincipal = this.data[0].imgPathPrincipal
    this.imgFondo = this.data[0].imgPathFondo
    this.colorn = this.data[0].colorFondo
    this.evaluarTipoBack()


    this.ObtenerUbicaciones()
  }

  evaluarTipoBack(){
    if(this.data[0].backgroundTipo == true){
      this.tipoBack = true
    }else if(this.data[0].backgroundTipo == false){
      this.tipoBack = false
    }
  }

  async ObtenerUbicaciones(){
    const respuesta = await this.UbicacionService.obtenerProcas()

    this.dataUbicaciones = respuesta.ubicaciones
    console.log(respuesta, this.dataUbicaciones)
  }


  showfilterImg(tipoTienda:string){
    this.filtroIMG = tipoTienda
    console.log(this.filtroIMG)
}



async obtenerProcas(){


  const respuesta = await this.UbicacionService.obtenerProcas()
  this.dataUbicaciones = respuesta.ubicaciones
  console.log('procasa')
  console.log(respuesta)
}
async obtenerprocasacdd(){
  const respuesta = await this.UbicacionService.obtenerprocasacdd()
  this.dataUbicaciones = respuesta.ubicaciones
  console.log('cdd')

}
async obtenermeatousegrab(){
  const respuesta = await this.UbicacionService.obtenermeatousegrab()
  this.dataUbicaciones = respuesta.ubicaciones
  console.log('grab')
}
async obtenermeatHouseCarnicera(){
  const respuesta = await this.UbicacionService.obtenermeatHouseCarnicera()
  this.dataUbicaciones = respuesta.ubicaciones
  console.log('carni')
}
async obtenerEconocarnes(){
  const respuesta = await this.UbicacionService.obtenerEconocarnes()
  this.dataUbicaciones = respuesta.ubicaciones
  console.log('eco')
}



checkLogo(item: number) {
    const btns: HTMLElement[] | any = Array.from(document.getElementsByClassName('cont-check'))
    btns.forEach((btn: HTMLElement, index: number) => {
      btn.classList.remove('enabled')
      if (index === item) { btn.classList.add('enabled') }
    })
  }
  


}
