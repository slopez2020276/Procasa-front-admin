import { Component } from '@angular/core';

@Component({
  selector: 'app-adminproductos',
  templateUrl: './adminproductos.component.html',
  styleUrl: './adminproductos.component.css'
})
export class AdminproductosComponent {
  ProductToSearch: any

ModalProduct(type:string){ document.getElementById('modal-'+type+'-product')?.classList.toggle('show') }


}
