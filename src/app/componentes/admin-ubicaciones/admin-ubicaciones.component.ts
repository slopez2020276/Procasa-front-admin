import { Component, OnInit, inject } from '@angular/core';
import { UbicacionServiceService } from '../../services/ubicacion-service.service';

@Component({
  selector: 'app-admin-ubicaciones',
  templateUrl: './admin-ubicaciones.component.html',
  styleUrl: './admin-ubicaciones.component.css'
})
export class AdminUbicacionesComponent implements OnInit {

ubicacionService = inject(UbicacionServiceService)

dataUbicacion



ngOnInit(): void {
  this.obtenerUbicacion()
}

async obtenerUbicacion(){
  const ubicacion = await this.ubicacionService.ObtenerUbicaionesAdmin()
  console.log(ubicacion.ubi)
  this.dataUbicacion = ubicacion.ubi
}


  AddLocation(){
    document.getElementById('modal-add-location')?.classList.toggle('toggle');
  }
  
  
  TbDelete(){
    console.log('BORRAR PRESED');
  
    confirm("Presione aceptar para confirmar");
  }
  
  TbEdit(){
    console.log('EDIT PRESED');
  
  }
}
