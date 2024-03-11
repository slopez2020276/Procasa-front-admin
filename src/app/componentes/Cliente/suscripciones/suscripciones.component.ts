import { Component, OnInit, inject } from '@angular/core';
import { SubsService } from '../../../services/subs.service';

@Component({
  selector: 'app-suscripciones',
  templateUrl: './suscripciones.component.html',
  styleUrl: './suscripciones.component.css'
})
export class SuscripcionesComponent implements OnInit {
 async ngOnInit(){
    this.ObtenerSubs()
  }

  SubService = inject(SubsService)

  dataSub:any;

  AddLocation(){
    document.getElementById('modal-add-location')?.classList.toggle('toggle');
  }

TbDelete(){

    confirm("Presione aceptar para confirmar");
    }

async eliminar(id){ 
const respuestaDelete = await this.SubService.eliminarsub(id)
console.log(respuestaDelete)
this.ObtenerSubs()
}

async ObtenerSubs(){
  const resSub = await this.SubService.obtenerSubs()
  this.dataSub = resSub.subs
}

}
