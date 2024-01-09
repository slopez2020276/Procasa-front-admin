import { Component } from '@angular/core';

@Component({
  selector: 'app-suscripciones',
  templateUrl: './suscripciones.component.html',
  styleUrl: './suscripciones.component.css'
})
export class SuscripcionesComponent {


  AddLocation(){
    document.getElementById('modal-add-location')?.classList.toggle('toggle');
  }


TbDelete(){
    confirm("Presione aceptar para confirmar");
    }

}
