import { Component } from '@angular/core';

@Component({
  selector: 'app-mision-valor',
  templateUrl: './mision-valor.component.html',
  styleUrl: './mision-valor.component.css'
})
export class MisionValorComponent {

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
