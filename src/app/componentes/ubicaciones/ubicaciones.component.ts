import { Component, OnInit, inject } from '@angular/core';
import { UbicacionServiceService } from '../../services/ubicacion-service.service';
import { HistoriaService } from '../../services/historia.service';

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

  async onSubmit(){ }

 async ngOnInit() {
  document.getElementById('cont-slide')?.classList.add('a')
    const response = await this.HistoriaService.obtenerHistoria()
    this.data = response.historia
    this.imgPrincipal = this.data[0].imgPathPrincipal
    this.imgFondo = this.data[0].imgPathFondo
  }


ShowContSucursales(c:any){
  this.removeClass()
    document.getElementById('cont-slide')?.classList.add(c)
}
removeClass(){
  document.getElementById('cont-slide')?.classList.remove('a')
  document.getElementById('cont-slide')?.classList.remove('b')
  document.getElementById('cont-slide')?.classList.remove('c')
}




}
