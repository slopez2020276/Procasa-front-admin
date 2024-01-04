import { Component, OnInit, inject } from '@angular/core';
import { MisionService } from '../../services/mision.service';

@Component({
  selector: 'app-mision-valor',
  templateUrl: './mision-valor.component.html',
  styleUrl: './mision-valor.component.css'
})
export class MisionValorComponent implements OnInit {
  
  MisionService = inject(MisionService)

  dataMision:any
  mision:string =''
  vision:string= ''


  
  async ngOnInit()  {
    const response = await this.MisionService.obtenerMsion()
    this.dataMision = response.Mision[0]
    this.mision = this.dataMision.textMision
    this.vision = this.dataMision.textVIsion
    
    console.log(response.Mision)
  }


  ValShow(val: number){
    // console.log(valshi);
    
    document.getElementById('open-val')?.classList.toggle('show');
    
    if (val==1) {
      document.getElementsByClassName('valhide')[1].classList.remove('show');
      document.getElementsByClassName('valhide')[2].classList.remove('show');
      document.getElementsByClassName('valhide')[3].classList.remove('show');
      document.getElementsByClassName('valhide')[0].classList.add('show');
    }else
    if (val==2) {
      document.getElementsByClassName('valhide')[0].classList.remove('show');
      document.getElementsByClassName('valhide')[2].classList.remove('show');
      document.getElementsByClassName('valhide')[3].classList.remove('show');
      document.getElementsByClassName('valhide')[1].classList.add('show');
    }else
    if (val==3) {
      document.getElementsByClassName('valhide')[0].classList.remove('show');
      document.getElementsByClassName('valhide')[1].classList.remove('show');
      document.getElementsByClassName('valhide')[3].classList.remove('show');
      document.getElementsByClassName('valhide')[2].classList.add('show');
    }else
    if (val==4) {
      document.getElementsByClassName('valhide')[0].classList.remove('show');
      document.getElementsByClassName('valhide')[1].classList.remove('show');
      document.getElementsByClassName('valhide')[2].classList.remove('show');
      document.getElementsByClassName('valhide')[3].classList.add('show');
    }
    
    }
    
}
