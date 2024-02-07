import { Component } from '@angular/core';

@Component({
  selector: 'app-nuestro-equipo',
  templateUrl: './nuestro-equipo.component.html',
  styleUrl: './nuestro-equipo.component.css'
})
export class NuestroEquipoComponent {

  toA(){ document.getElementsByClassName('area')[0]?.scrollIntoView({behavior:"smooth"}) }
  toB(){ document.getElementsByClassName('area')[1]?.scrollIntoView({behavior:"smooth"}) }
  toC(){ document.getElementsByClassName('area')[2]?.scrollIntoView({behavior:"smooth"}) }
  toD(){ document.getElementsByClassName('area')[3]?.scrollIntoView({behavior:"smooth"}) }
  toE(){ document.getElementsByClassName('area')[4]?.scrollIntoView({behavior:"smooth"}) }

}
