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


  toA(){ document.getElementsByClassName('area')[0]?.scrollIntoView({behavior:"smooth"}) }
  toB(){ document.getElementsByClassName('area')[1]?.scrollIntoView({behavior:"smooth"}) }
  toC(){ document.getElementsByClassName('area')[2]?.scrollIntoView({behavior:"smooth"}) }
  toD(){ document.getElementsByClassName('area')[3]?.scrollIntoView({behavior:"smooth"}) }
  toE(){ document.getElementsByClassName('area')[4]?.scrollIntoView({behavior:"smooth"}) }



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
