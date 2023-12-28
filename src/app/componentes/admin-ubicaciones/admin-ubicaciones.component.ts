import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-ubicaciones',
  templateUrl: './admin-ubicaciones.component.html',
  styleUrl: './admin-ubicaciones.component.css'
})
export class AdminUbicacionesComponent {


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
