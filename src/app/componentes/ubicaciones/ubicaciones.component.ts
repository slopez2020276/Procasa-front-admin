import { Component, OnInit, inject } from '@angular/core';
import { UbicacionServiceService } from '../../services/ubicacion-service.service';
import { HistoriaService } from '../../services/historia.service';
import { MostrarimgsUbicacionPipe } from '../../pipes/mostrarimgs-ubicacion.pipe'
import { MostrarPorUbiPipe } from '../../pipes/mostrar-por-ubi.pipe'
import { UneteEquipoService } from '../../services/unete-equipo.service';

@Component({
  selector: 'app-ubicaciones',
  templateUrl: './ubicaciones.component.html',
  styleUrl: './ubicaciones.component.css'
})
export class UbicacionesComponent {

  UbicacionService = inject(UbicacionServiceService)

  constructor(){ }
  data
  imgPrincipal
  imgFondo
  HistoriaService = inject(HistoriaService)
  UbicacionesService = inject(UbicacionServiceService)
  dataUbicaciones
  filtro
  filtroIMG
  async onSubmit(){ }

 async ngOnInit() {
   document.getElementById('cont-slide')?.classList.add('a')
   const response = await this.HistoriaService.obtenerHistoria()
   document.getElementsByClassName('title-sucs')[0]?.classList.add('select')
   const elements = document.getElementsByClassName('title-sucs') as HTMLCollectionOf<HTMLElement>; elements[0].style.background = '#656565'


    this.data = response.historia
    this.imgPrincipal = this.data[0].imgPathPrincipal
    this.imgFondo = this.data[0].imgPathFondo
    this.ObtenerUbicaciones()
  }


  async ObtenerUbicaciones(){
    const respuesta = await this.UbicacionService.ObtenerUbicaionesAdmin()

    this.dataUbicaciones = respuesta.ubi
console.log(respuesta, this.dataUbicaciones)
  }


ShowContSucursales(c:any, h:number){
  this.removeClass()
    document.getElementById('cont-slide')?.classList.add(c)
    const elements = document.getElementsByClassName('title-sucs') as HTMLCollectionOf<HTMLElement>
    elements[h].style.background = '#656565'






  }

  showfilterImg(tipoTienda:string){
    this.filtroIMG = tipoTienda
    console.log(this.filtroIMG)

  }
  removeClass(){
    document.getElementById('cont-slide')?.classList.remove('a')
    document.getElementById('cont-slide')?.classList.remove('b')
    document.getElementById('cont-slide')?.classList.remove('c')
      document.getElementsByClassName('title-sucs')[0]?.classList.remove('select')
      document.getElementsByClassName('title-sucs')[1]?.classList.remove('select')
      document.getElementsByClassName('title-sucs')[2]?.classList.remove('select')
    const elements = document.getElementsByClassName('title-sucs') as HTMLCollectionOf<HTMLElement>
    elements[0].style.background = '#252525'
    elements[1].style.background = '#252525'
    elements[2].style.background = '#252525'
}




}
