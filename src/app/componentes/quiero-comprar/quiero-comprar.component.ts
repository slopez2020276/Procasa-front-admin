import { Component, inject } from '@angular/core';
import { HistoriaService } from '../../services/historia.service';

@Component({
  selector: 'app-quiero-comprar',
  templateUrl: './quiero-comprar.component.html',
  styleUrl: './quiero-comprar.component.css'
})
export class QuieroComprarComponent {

  
constructor(){ }
data
imgPrincipal
imgFondo
HistoriaService = inject(HistoriaService)

async onSubmit(){ }

async ngOnInit() {
  const response = await this.HistoriaService.obtenerHistoria()
  this.data = response.historia
  this.imgPrincipal = this.data[0].imgPathPrincipal
  this.imgFondo = this.data[0].imgPathFondo
}

}
