import { Component, inject, OnInit } from '@angular/core';
import { HistoriaService } from '../../../services/historia.service';
import { ProductosService } from '../../../services/productos.service';

@Component({
  selector: 'app-nuestros-clientes',
  templateUrl: './nuestros-clientes.component.html',
  styleUrl: './nuestros-clientes.component.css'
})
export class NuestrosClientesComponent implements OnInit {
  data
  imgPrincipal
  imgFondo
  dataProductos
  productorService = inject(ProductosService)
  HistoriaService = inject(HistoriaService)
  

  async ngOnInit(): Promise<void>{
    const response = await this.HistoriaService.obtenerHistoria()
    this.data = response.historia
    this.imgPrincipal = this.data[0].imgPathPrincipal
    this.imgFondo = this.data[0].imgPathFondo
  }
}