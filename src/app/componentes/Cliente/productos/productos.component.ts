import { Component, OnInit, inject } from '@angular/core';
import { ProductosService } from '../../../services/productos.service';
import { HistoriaService } from '../../../services/historia.service';
import { MarcasService } from '../../../services/marcas.service';

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
  MarcasServices = inject(MarcasService)
  HistoriaService = inject(HistoriaService)
  dataMarcas

  async ngOnInit(): Promise<void> {
    this.ObtenerProductos()
    const response = await this.HistoriaService.obtenerHistoria()
    this.data = response.historia
    this.imgPrincipal = this.data[0].imgPathPrincipal
    this.imgFondo = this.data[0].imgPathFondo
    this.colorn = this.data[0].colorFondo
    this.evaluarTipoBack()
    this.obtnerMarcas()
  }
  
  ObtenerProductos(){
    this.productorService.obtenerProductos().subscribe(
      (res:any) => {
        this.dataProductos = res.productosEncontrados
        console.log(this.dataProductos[0].categorias[7].items)
      }
    )
  }


  async obtnerMarcas(){
    const response = await this.MarcasServices.obtenerMarcas()
    this.dataMarcas = response.marcas
    console.log(this.dataMarcas)
  }

  evaluarTipoBack(){
    if(this.data[0].backgroundTipo == true){
      this.tipoBack = true
    }else if(this.data[0].backgroundTipo == false){
      this.tipoBack = false
    }
  }
 





}
