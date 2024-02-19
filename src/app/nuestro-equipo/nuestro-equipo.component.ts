import { Component, Inject, OnInit, inject } from '@angular/core';
import { UneteEquipoService } from '../services/unete-equipo.service';

@Component({
  selector: 'app-nuestro-equipo',
  templateUrl: './nuestro-equipo.component.html',
  styleUrl: './nuestro-equipo.component.css'
})
export class NuestroEquipoComponent implements OnInit{

  uneteEquipoService = inject(UneteEquipoService)
   dataUnete


toScrollPlaza(){
  const plazas = document.getElementsByClassName('cont-area')
  for(let i = 0;  i < plazas.length; i++){ document.getElementsByClassName('cont-area')[i]?.scrollIntoView({behavior:"smooth"}) }
}

  ngOnInit(){
    this.getDataUneteEquipo()
  }

async getDataUneteEquipo(){
 const data = await this.uneteEquipoService.otenerUneteEquipo()
 this.dataUnete = data.unete
  console.log(data.unete[0].funciones)
}


obtenerItemd(index:any){
  console.log(index)
}

obternerFondo(){

}
}
