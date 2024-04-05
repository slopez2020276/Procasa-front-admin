import { Component, OnInit, inject } from '@angular/core';
import { ProductosService } from '../../../services/productos.service';
import { HistoriaService } from '../../../services/historia.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})


export class ProductosComponent implements OnInit {
  data
  imgPrincipal
  imgFondo
  colorn
  tipoBack
  dataProductos
  productorService = inject(ProductosService)
  HistoriaService = inject(HistoriaService)

  async ngOnInit(): Promise<void> {
    this.ObtenerProductos()
    const response = await this.HistoriaService.obtenerHistoria()
    this.data = response.historia
    this.imgPrincipal = this.data[0].imgPathPrincipal
    this.imgFondo = this.data[0].imgPathFondo
    this.colorn = this.data[0].colorFondo
    this.evaluarTipoBack()
  }
  
  ObtenerProductos(){
    this.productorService.obtenerProductos().subscribe(
      (res:any) => {
        this.dataProductos = res.productosEncontrados
        console.log(this.dataProductos[0].categorias[7].items)
      }
    )
  }


  evaluarTipoBack(){
    if(this.data[0].backgroundTipo == true){
      this.tipoBack = true
    }else if(this.data[0].backgroundTipo == false){
      this.tipoBack = false
    }
  }
 





}