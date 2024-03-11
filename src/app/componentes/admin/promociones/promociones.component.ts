import { Component } from '@angular/core';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrl: './promociones.component.css'
})
export class PromocionesComponent {
  OpenModal(){
    document.getElementById('modal-add-location')?.classList.toggle('openmodal');
  }
  
}
