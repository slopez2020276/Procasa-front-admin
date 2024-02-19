import { Component, OnInit, inject } from '@angular/core';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent  implements OnInit {
  ngOnInit(): void {
    this.ObtenerProductos()
  }

  dataProductos:any 

  productorService = inject(ProductosService)


  ObtenerProductos(){
    this.productorService.obtenerProductos().subscribe(
      (res:any) => {
        this.dataProductos = res.productosEncontrados
        console.log(this.dataProductos[0].categorias[7].items)
      }
    )
  }





}
