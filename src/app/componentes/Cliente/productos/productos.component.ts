import { Component, OnInit, inject } from '@angular/core';
import { ProductosService } from '../../../services/productos.service';
import { HistoriaService } from '../../../services/historia.service';
import { MarcasService } from '../../../services/marcas.service';
import { ActivatedRoute } from '@angular/router';

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
  carrousel:HTMLElement | any
  count:any = 0
  id:any

  async ngOnInit(): Promise<void> {
    this.ObtenerProductos()
    const response = await this.HistoriaService.obtenerHistoria()
    this.data = response.historia
    this.imgPrincipal = this.data[0].imgPathPrincipal
    this.imgFondo = this.data[0].imgPathFondo
    this.colorn = this.data[0].colorFondo
    this.evaluarTipoBack()
    this.obtnerMarcas()

    this.carrousel = document.querySelector('div#carrousel-marcas')

    this.route.params.subscribe(params => { this.id = params['por-que-procasa']; this.desplazarElemento(this.id) })
    this.route.params.subscribe(params => { this.id = params['nuestras-marcas']; this.desplazarElemento(this.id) })
    this.route.params.subscribe(params => { this.id = params['catalogo']; this.desplazarElemento(this.id) })

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
 


arrowRight() {
    this.count -= 30
    this.carrousel.style.left = this.count+"vw"
}
  
arrowLeft() {
    this.count += 30
    if(this.count >= 0){ this.count = 0 }
    this.carrousel.style.left = this.count+"vw"
}




desplazarElemento(id) { const elemento:HTMLElement | any = document.getElementById(id); if (elemento) { const desplazamientoEnPX = 60; window.scrollTo({ top: elemento.offsetTop - desplazamientoEnPX,  behavior: 'smooth' }) } }
  constructor(private route: ActivatedRoute) {}


}
