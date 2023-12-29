import { Component, OnInit, inject } from '@angular/core';
import { HistoriaService } from '../../services/historia.service';

@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrl: './historia.component.css'
})
export class HistoriaComponent implements OnInit {
  data
  historiaService = inject(HistoriaService)


    ngOnInit()  {


    window.onload = function () {
      const footer = document.getElementById('footer');
      let scrollywindow:number = 0;
      window.addEventListener('scroll',function(){
              scrollywindow=this.scrollY;
            if(scrollywindow>=1){
                footer?.classList.add('fdown');
                if(scrollywindow>=300){
                  footer?.classList.add("ftofoot");
                }
              }else{
                footer?.classList.remove('fdown');
                footer?.classList.remove("ftofoot");
            }
      },false);
  }

  }





}
