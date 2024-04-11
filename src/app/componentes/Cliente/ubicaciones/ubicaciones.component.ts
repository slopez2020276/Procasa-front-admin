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
  ecostate = true;
trackByFn:any;

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
  dataId

  direccion
  telefono
  nombreTienda
  descripcion
  enlaceMaps
  enlaceWaze
  horario
  imgPath
  whatsapp

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

  mostrarwts(){
    this.ecostate = true
    console.log('mostrar')
  }
  
  ocultarwts(){
    this.ecostate = false
    console.log('oculto')
  }
  


h1Selected(event) {
    const elemento = event.target;
    const elementosConClase = document.querySelectorAll('.selected-h1')
  
    elementosConClase.forEach((el) => { el.classList.remove('selected-h1') })
  
    elemento?.classList.add('selected-h1')
  }
  

async selecStore(id: any){




    const respuestaId = await this.UbicacionService.ObtenerUbicaionesxid(id)
    this.direccion = respuestaId.ubi.direccion
    this.telefono = respuestaId.ubi.telefono
    this.nombreTienda = respuestaId.ubi.nombreTienda
    this.descripcion = respuestaId.ubi.descripcion
    this.enlaceMaps = respuestaId.ubi.enlaceMaps
    this.enlaceWaze = respuestaId.ubi.enlaceWaze
    this.horario = respuestaId.ubi.horario
    this.imgPath = respuestaId.ubi.imgPath
    this.whatsapp = respuestaId.ubi.whatsapp
  }

  



  async ObtenerUbicaciones(){
    const respuesta = await this.UbicacionService.obtenerProcas()

    this.dataUbicaciones = respuesta.ubicaciones

    this.direccion = respuesta.ubicaciones[0].direccion
    this.telefono = respuesta.ubicaciones[0].telefono
    this.nombreTienda = respuesta.ubicaciones[0].nombreTienda
    this.descripcion = respuesta.ubicaciones[0].descripcion
    this.enlaceMaps = respuesta.ubicaciones[0].enlaceMaps
    this.enlaceWaze = respuesta.ubicaciones[0].enlaceWaze
    this.horario = respuesta.ubicaciones[0].horario
    this.imgPath = respuesta.ubicaciones[0].imgPath
    this.whatsapp = respuesta.ubicaciones[0].whatsapp
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

  this.direccion = respuesta.ubicaciones[0].direccion
    this.telefono = respuesta.ubicaciones[0].telefono
    this.nombreTienda = respuesta.ubicaciones[0].nombreTienda
    this.descripcion = respuesta.ubicaciones[0].descripcion
    this.enlaceMaps = respuesta.ubicaciones[0].enlaceMaps
    this.enlaceWaze = respuesta.ubicaciones[0].enlaceWaze
    this.horario = respuesta.ubicaciones[0].horario
    this.imgPath = respuesta.ubicaciones[0].imgPath
    this.whatsapp = respuesta.ubicaciones[0].whatsapp
}
async obtenerprocasacdd(){
  const respuesta = await this.UbicacionService.obtenerprocasacdd()
  this.dataUbicaciones = respuesta.ubicaciones
  this.direccion = respuesta.ubicaciones[0].direccion
  this.telefono = respuesta.ubicaciones[0].telefono
  this.nombreTienda = respuesta.ubicaciones[0].nombreTienda
  this.descripcion = respuesta.ubicaciones[0].descripcion
  this.enlaceMaps = respuesta.ubicaciones[0].enlaceMaps
  this.enlaceWaze = respuesta.ubicaciones[0].enlaceWaze
  this.horario = respuesta.ubicaciones[0].horario
  this.imgPath = respuesta.ubicaciones[0].imgPath
  this.whatsapp = respuesta.ubicaciones[0].whatsapp
  console.log('cdd')

}
async obtenermeatousegrab(){
  const respuesta = await this.UbicacionService.obtenermeatousegrab()
  this.dataUbicaciones = respuesta.ubicaciones
  this.direccion = respuesta.ubicaciones[0].direccion
  this.telefono = respuesta.ubicaciones[0].telefono
  this.nombreTienda = respuesta.ubicaciones[0].nombreTienda
  this.descripcion = respuesta.ubicaciones[0].descripcion
  this.enlaceMaps = respuesta.ubicaciones[0].enlaceMaps
  this.enlaceWaze = respuesta.ubicaciones[0].enlaceWaze
  this.horario = respuesta.ubicaciones[0].horario
  this.imgPath = respuesta.ubicaciones[0].imgPath
  this.whatsapp = respuesta.ubicaciones[0].whatsapp
  console.log('grab')
}
async obtenermeatHouseCarnicera(){
  const respuesta = await this.UbicacionService.obtenermeatHouseCarnicera()
  this.dataUbicaciones = respuesta.ubicaciones
  this.direccion = respuesta.ubicaciones[0].direccion
  this.telefono = respuesta.ubicaciones[0].telefono
  this.nombreTienda = respuesta.ubicaciones[0].nombreTienda
  this.descripcion = respuesta.ubicaciones[0].descripcion
  this.enlaceMaps = respuesta.ubicaciones[0].enlaceMaps
  this.enlaceWaze = respuesta.ubicaciones[0].enlaceWaze
  this.horario = respuesta.ubicaciones[0].horario
  this.imgPath = respuesta.ubicaciones[0].imgPath
  this.whatsapp = respuesta.ubicaciones[0].whatsapp
  console.log('carni')
}
async obtenerEconocarnes(){
  const respuesta = await this.UbicacionService.obtenerEconocarnes()
  this.dataUbicaciones = respuesta.ubicaciones
  this.direccion = respuesta.ubicaciones[0].direccion
  this.telefono = respuesta.ubicaciones[0].telefono
  this.nombreTienda = respuesta.ubicaciones[0].nombreTienda
  this.descripcion = respuesta.ubicaciones[0].descripcion
  this.enlaceMaps = respuesta.ubicaciones[0].enlaceMaps
  this.enlaceWaze = respuesta.ubicaciones[0].enlaceWaze
  this.horario = respuesta.ubicaciones[0].horario
  this.imgPath = respuesta.ubicaciones[0].imgPath
  this.whatsapp = respuesta.ubicaciones[0].whatsapp
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
