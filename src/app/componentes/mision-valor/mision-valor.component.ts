import { Component, OnInit, inject } from '@angular/core';
import { MisionService } from '../../services/mision.service';
import { ValoresService } from '../../services/valores.service';

@Component({
  selector: 'app-mision-valor',
  templateUrl: './mision-valor.component.html',
  styleUrl: './mision-valor.component.css'
})
export class MisionValorComponent implements OnInit {
  
  MisionService = inject(MisionService)
  ValoresService = inject(ValoresService)


  Integridad:any
  Pasion:any
  Innovacion:any
  Orientacion:any
  
  dataValores
  dataMision:any
  mision:string =''
  vision:string= ''


  
  async ngOnInit()  {
    this.obtenerMision()
    this.obtnerValores()
    
  }

  async obtenerMision(){
    const response = await this.MisionService.obtenerMsion()
    this.dataMision = response.Mision[0]
    this.mision = this.dataMision.textMision
    this.vision = this.dataMision.textVIsion
  }

  async obtnerValores(){
    const respuesta = await this.ValoresService.obtenerValores()
    this.dataValores = respuesta.valores[0]
    this.Innovacion = this.dataValores.Innovacion
    this.Pasion = this.dataValores.Pasion
    this.Integridad = this.dataValores.Integridad
    this.Orientacion = this.dataValores.Orientacion
    console.log(this.dataValores)

  }


  ValShow(val: number){
    // console.log(valshi);
    
    document.getElementById('open-val')?.classList.toggle('show')
    
    if (val==1) {
      document.getElementsByClassName('valhide')[1].classList.remove('show')
      document.getElementsByClassName('valhide')[2].classList.remove('show')
      document.getElementsByClassName('valhide')[3].classList.remove('show')
      document.getElementsByClassName('valhide')[0].classList.add('show')
    }else
    if (val==2) {
      document.getElementsByClassName('valhide')[0].classList.remove('show')
      document.getElementsByClassName('valhide')[2].classList.remove('show')
      document.getElementsByClassName('valhide')[3].classList.remove('show')
      document.getElementsByClassName('valhide')[1].classList.add('show')
    }else
    if (val==3) {
      document.getElementsByClassName('valhide')[0].classList.remove('show')
      document.getElementsByClassName('valhide')[1].classList.remove('show')
      document.getElementsByClassName('valhide')[3].classList.remove('show')
      document.getElementsByClassName('valhide')[2].classList.add('show')
    }else
    if (val==4) {
      document.getElementsByClassName('valhide')[0].classList.remove('show')
      document.getElementsByClassName('valhide')[1].classList.remove('show')
      document.getElementsByClassName('valhide')[2].classList.remove('show')
      document.getElementsByClassName('valhide')[3].classList.add('show')
    }
    
    }
    
}
